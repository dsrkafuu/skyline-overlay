import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks';
import clsx from 'clsx';
import { fmtDuration, fmtNumber, fmtZoneName } from '../utils/formatters';
import { useEffect, useState } from 'react';

function parseTime(time: number) {
  const d = new Date(time);
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const hh = hour < 10 ? `0${hour}` : hour;
  const mm = min < 10 ? `0${min}` : min;
  const ss = sec < 10 ? `0${sec}` : sec;
  return `${hh}:${mm}:${ss}`;
}

interface SettingsHistoryRowProps {
  current: boolean;
  duration: string;
  dps: number;
  zoneName: string;
  time?: number;
  onClick?: () => void;
  shortNumber?: boolean;
}

function SettingsHistoryRow({
  current,
  duration,
  dps,
  zoneName,
  time,
  onClick,
  shortNumber,
}: SettingsHistoryRowProps) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={clsx('settings-history-row', {
        'settings-history-row--active': current,
      })}
      onClick={onClick}
    >
      <div className='settings-history-item settings-history-time'>
        {parseTime(time || now)}
      </div>
      <div className='settings-history-item settings-history-duration'>
        {fmtDuration(duration)}
      </div>
      <div className='settings-history-item settings-history-zone'>
        {fmtZoneName(zoneName)}
      </div>
      <div className='settings-history-item settings-history-dps'>
        <span className='g-number'>{fmtNumber(dps, shortNumber)}</span>
        <span className='g-counter'>DPS</span>
      </div>
    </div>
  );
}

function SettingsHistory() {
  const { api } = useStore();
  // do not use getters here, since getter may returns history data when selected
  const { duration, dps, zoneName } = api.data.encounter;

  const { settings } = useStore();
  const { shortNumber } = settings;

  return (
    <div className='settings-history'>
      <div className='settings-history-space'></div>
      <SettingsHistoryRow
        current={api.history.idx === -1}
        duration={duration}
        dps={dps}
        zoneName={zoneName}
        onClick={() => api.showHistory(-1)}
        shortNumber={shortNumber}
      />
      {api.historys.map((item, idx) => {
        const { duration, dps, zoneName } = item.encounter;
        return (
          <SettingsHistoryRow
            key={idx}
            current={api.history.idx === idx}
            time={item.time}
            duration={duration}
            dps={dps}
            zoneName={zoneName}
            onClick={() => api.showHistory(idx)}
            shortNumber={shortNumber}
          />
        );
      })}
      <div className='settings-history-space'></div>
    </div>
  );
}

export default observer(SettingsHistory);
