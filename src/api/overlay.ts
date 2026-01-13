import injectExtendData from './modules/injectExtendData';
import isCEFSharp from './modules/isCEFSharp';
import mergeCombatant from './modules/mergeCombatant';
import { EventType, EventData, EventCallback } from './types';
import { logInfo, logError, logWarn } from './utils/logger';

// messages callbacks in callback mode
type MsgCallback = (msg: any) => void;

// messages send with `_sendMessage`
interface MsgPacket {
  msg: any;
  cb?: MsgCallback;
}

type EventCenterItem = {
  started: boolean;
  listeners: EventCallback[];
};

type EventCenter = {
  CombatData: EventCenterItem;
  LogLine: EventCenterItem;
  ImportedLogLines: EventCenterItem;
  ChangeZone: EventCenterItem;
  ChangePrimaryPlayer: EventCenterItem;
  OnlineStatusChanged: EventCenterItem;
  PartyChanged: EventCenterItem;
  BroadcastMessage: EventCenterItem;
};

// `common.js` L44
interface ResponsePromises {
  [rseq: number]: (...args: any[]) => void; // `resolve()` functions from Promise
}

export class OverlayAPI {
  // singleton
  static _instance: OverlayAPI | null = null;
  // function for merging combatant like pets into first player arg
  static mergeCombatant = mergeCombatant;
  // check if in overlay plugin emblemed cef
  static isCEFSharp = isCEFSharp;

  // plugin init status
  private _status = false;

  // event subscribers
  private _eventCenter: EventCenter = {
    CombatData: { started: false, listeners: [] },
    LogLine: { started: false, listeners: [] },
    ImportedLogLines: { started: false, listeners: [] },
    ChangeZone: { started: false, listeners: [] },
    ChangePrimaryPlayer: { started: false, listeners: [] },
    OnlineStatusChanged: { started: false, listeners: [] },
    PartyChanged: { started: false, listeners: [] },
    BroadcastMessage: { started: false, listeners: [] },
  };
  // waiting queue before api init
  private _queue: MsgPacket[] = [];

  // websocket mode related things
  private _wsURL =
    Array.from(
      /[?&]OVERLAY_WS=([^&]+)/.exec(window.location.href) ||
        /[?&]HOST_PORT=([^&]+)/.exec(window.location.href) ||
        []
    )[1] || '';
  private _ws: WebSocket | null = null;
  private _rseqCounter = 0;
  private _responsePromises: ResponsePromises = {};

  /**
   * init API
   */
  constructor() {
    // singleton
    if (OverlayAPI._instance) {
      logWarn(`class OverlayAPI should only have one instance`);
      return OverlayAPI._instance;
    }

    // check mode
    if (this._wsURL) {
      logInfo('initializing api in websocket mode...');
      this._initWS();
    } else {
      logInfo('initializing api in callback mode...');
      this._initCB();
    }
    // `common.js` _L97 binding
    window.dispatchOverlayEvent = this._triggerEvents.bind(this);

    // singleton
    if (!OverlayAPI._instance) {
      OverlayAPI._instance = this;
    }
  }

  /**
   * `common.js` L90
   * event trigger function, need `this` binding
   */
  private _triggerEvents(data: EventData) {
    // if this event type has subscribers
    if (this._eventCenter[data.type]) {
      // trigger all this event's callback
      for (const cb of this._eventCenter[data.type].listeners) {
        cb(injectExtendData(data));
      }
    }
  }

  /**
   * `common.js` L12 & L65
   * send message in callback mode & websocket mode
   */
  private _sendMessage(msg: any, cb?: MsgCallback) {
    if (this._wsURL) {
      if (this._status) {
        try {
          (this._ws as WebSocket).send(JSON.stringify(msg));
        } catch (e) {
          logError(e, msg);
          return;
        }
      } else {
        this._queue.push({ msg });
      }
    } else {
      if (this._status) {
        try {
          window.OverlayPluginApi.callHandler(JSON.stringify(msg), cb);
        } catch (e) {
          logError(e, msg);
          return;
        }
      } else {
        this._queue.push({ msg, cb });
      }
    }
  }

  /**
   * `common.js` L19
   * init api in websocket mode
   */
  private _initWS() {
    // legacy ws url support
    let url = this._wsURL;
    if (!url.includes('/ws')) {
      url += (url.endsWith('/') ? '' : '/') + 'ws';
    }
    // check & init or reinit websocket
    const _doInit = () => {
      this._ws = new WebSocket(url);
      // log error & retry after 1s
      this._ws.addEventListener('error', () => {
        try {
          this._ws && this._ws.close();
          // eslint-disable-next-line no-empty
        } catch {}
        setTimeout(() => {
          _doInit();
        }, 1000);
      });
      // successfully connected WebSocket
      this._ws.addEventListener('open', () => {
        this._status = true;
        // send all messages in queue to OverlayPlugin
        for (const { msg } of this._queue) {
          this._sendMessage(msg);
        }
        logInfo('websocket mode api ready');
      });
      // on message loaded from WebSocket
      this._ws.addEventListener('message', (msg) => {
        let data: EventData;
        try {
          data = JSON.parse(msg.data) as EventData;
        } catch (e) {
          logError(e, msg);
          return;
        }
        // `common.js` L44
        if (data.rseq !== undefined && this._responsePromises[data.rseq]) {
          this._responsePromises[data.rseq](data);
          delete this._responsePromises[data.rseq];
        } else {
          this._triggerEvents(data);
        }
      });
    };
    _doInit();
  }

  /**
   * `common.js` L72
   * init api in callback mode
   */
  private _initCB() {
    // if CEF environment not ready retry after 1s
    if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
      setTimeout(() => {
        this._initCB();
      }, 1000);
      return;
    }
    // mark api loaded
    this._status = true;
    // bind `this` for callback function called by OverlayAPI
    // `common.js` L81 binding
    window.__OverlayCallback = this._triggerEvents.bind(this);
    // send all messages in queue to OverlayPlugin
    for (const { msg, cb } of this._queue) {
      this._sendMessage(msg, cb);
    }
    logInfo('callback mode api ready');
  }

  /**
   * add an event listener
   */
  addListener(event: EventType, cb: EventCallback) {
    if (this._eventCenter[event].started) {
      logWarn(
        `listener for \`${event}\` added after event transmission already started`
      );
      logWarn(`some events might have been missed`);
      logWarn(`please register your listeners before calling \`startEvent()\``);
    }
    // push events
    if (typeof cb === 'function') {
      this._eventCenter[event].listeners.push(cb);
      logInfo(`listener for \`${event}\` added`);
    }
  }

  /**
   * remove a listener
   */
  removeListener(event: EventType, cb: EventCallback) {
    if (typeof cb === 'function') {
      const cbPos = this._eventCenter[event].listeners.indexOf(cb);
      if (cbPos > -1) {
        this._eventCenter[event].listeners.splice(cbPos, 1);
        logInfo(`listener for \`${event}\` removed`);
      } else {
        logWarn(`listener for \`${event}\` not found`);
      }
    }
  }

  /**
   * remove all listener of one event type
   */
  removeAllListener(event: EventType) {
    this._eventCenter[event].listeners = [];
    logInfo(`all listener for \`${event}\` removed`);
  }

  /**
   * get all listeners of a event
   */
  getAllListener(event: EventType) {
    return this._eventCenter[event].listeners;
  }

  /**
   * start listening event
   */
  startEvent() {
    const eventTypesWithListeners = (
      Object.keys(this._eventCenter) as Array<EventType>
    ).filter((eventType) => {
      return this._eventCenter[eventType].listeners.length > 0;
    });
    this._sendMessage({
      call: 'subscribe',
      events: eventTypesWithListeners,
    });
    logInfo(
      `${eventTypesWithListeners.length} types of event transmission started`
    );
  }

  /**
   * ends current encounter and save it, not working in websocket mode
   */
  async endEncounter() {
    if (this._status && isCEFSharp()) {
      await window.OverlayPluginApi.endEncounter();
      logInfo('encounter ended');
    }
  }

  /**
   * `common.js` L122
   * this function allows you to call an overlay handler,
   * these handlers are declared by Event Sources,
   * either built into OverlayPlugin or loaded through addons like Cactbot
   */
  callHandler(msg: any) {
    let p: Promise<any>;
    if (this._wsURL) {
      const rseq = this._rseqCounter++;
      msg.rseq = rseq;
      p = new Promise((resolve) => {
        this._responsePromises[rseq] = resolve;
      });
      this._sendMessage(msg);
    } else {
      p = new Promise((resolve) => {
        this._sendMessage(msg, (data) => {
          resolve(data == null ? null : JSON.parse(data));
        });
      });
    }
    return p;
  }

  /**
   * simulate triggering event once
   */
  simulateData(data: EventData) {
    this._triggerEvents(data);
  }
}

export default OverlayAPI;
