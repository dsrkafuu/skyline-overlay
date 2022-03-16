/**
 * https://github.com/streamich/react-use/blob/master/src/useLongPress.ts
 * Latest commit a27f09f on 29 Jan 2021 (Unlicense License)
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useRef } from 'react';

function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    );
  }
}

export interface LongPressOptions {
  isPreventDefault?: boolean;
  delay?: number;
}

function isTouchEvent(ev: Event): ev is TouchEvent {
  return 'touches' in ev;
}

function preventDefault(ev: Event) {
  if (!isTouchEvent(ev)) return;
  if (ev.touches.length < 2 && ev.preventDefault) {
    ev.preventDefault();
  }
}

const useLongPress = (
  callback: (e: TouchEvent | MouseEvent) => void,
  { isPreventDefault = true, delay = 300 }: LongPressOptions = {}
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      // prevent ghost click on mobile devices
      if (isPreventDefault && event.target) {
        on(event.target, 'touchend', preventDefault, { passive: false });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => callback(event), delay);
    },
    [callback, delay, isPreventDefault]
  );

  const clear = useCallback(() => {
    // clearTimeout and removeEventListener
    timeout.current && clearTimeout(timeout.current);

    if (isPreventDefault && target.current) {
      off(target.current, 'touchend', preventDefault);
    }
  }, [isPreventDefault]);

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  } as const;
};

export default useLongPress;
