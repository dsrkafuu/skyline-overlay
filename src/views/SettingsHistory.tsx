import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { showHistory } from '@/store/slices/api';
import { fmtDuration, fmtNumber, fmtZoneName } from '@/utils/formatters';

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
  const [now, setNow] = useState(() => Date.now());
  // only tick for the current live row (no fixed timestamp)
  useEffect(() => {
    if (time !== undefined) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div
      className={clsx('settings-history-row', {
        'settings-history-row--active': current,
      })}
      onClick={onClick}
    >
      <div className='settings-history-item settings-history-time'>{parseTime(time || now)}</div>
      <div className='settings-history-item settings-history-duration'>{fmtDuration(duration)}</div>
      <div className='settings-history-item settings-history-zone'>{fmtZoneName(zoneName)}</div>
      <div className='settings-history-item settings-history-dps'>
        <span className='g-number'>{fmtNumber(dps, shortNumber)}</span>
        <span className='g-counter'>DPS</span>
      </div>
    </div>
  );
}

function SettingsHistory() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.api.data);
  const historys = useAppSelector((state) => state.api.historys);
  const historyIdx = useAppSelector((state) => state.api.historyIdx);
  const shortNumber = useAppSelector((state) => state.settings.shortNumber);

  return (
    <div className='settings-history'>
      <SettingsHistoryRow
        current={historyIdx === -1}
        duration={data.encounter.duration}
        dps={data.encounter.dps}
        zoneName={data.encounter.zoneName}
        onClick={() => dispatch(showHistory(-1))}
        shortNumber={shortNumber}
      />
      {historys.map((item, idx) => {
        const { duration, dps, zoneName } = item.encounter;
        return (
          <SettingsHistoryRow
            key={idx}
            current={historyIdx === idx}
            time={item.time}
            duration={duration}
            dps={dps}
            zoneName={zoneName}
            onClick={() => dispatch(showHistory(idx))}
            shortNumber={shortNumber}
          />
        );
      })}
    </div>
  );
}

export default SettingsHistory;
