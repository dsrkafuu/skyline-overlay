import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks';
import clsx from 'clsx';
import { fmtDuration, fmtZoneName } from '../utils/formatters';

function parseDate(time?: number) {
  if (!time) {
    return '';
  }
  const d = new Date(time);
  const mon = d.getMonth() + 1;
  const day = d.getDate();
  const MM = mon < 10 ? `0${mon}` : mon;
  const DD = day < 10 ? `0${day}` : day;
  return `${MM}-${DD}`;
}

function parseTime(time?: number) {
  if (!time) {
    return '';
  }
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
  zone: string;
  time?: number;
  onClick?: () => void;
}

function SettingsHistoryRow({
  current,
  duration,
  zone,
  time,
  onClick,
}: SettingsHistoryRowProps) {
  return (
    <div
      className={clsx('settings-history-row', {
        'settings-history-row--active': current,
      })}
      onClick={onClick}
    >
      <span className='settings-history-item'>{parseDate(time)}</span>
      <span className='settings-history-item'>{parseTime(time)}</span>
      <span className='settings-history-item'>{fmtDuration(duration)}</span>
      <span className='settings-history-item'>{fmtZoneName(zone)}</span>
    </div>
  );
}

function SettingsHistory() {
  const { api } = useStore();

  return (
    <div className='settings-history'>
      <div className='settings-history-space'></div>
      <SettingsHistoryRow
        current={!api.history}
        duration={api.data.encounter.duration}
        zone={api.data.encounter.zoneName}
        onClick={() => api.showHistory(-1)}
      />
      {api.historys.map((item, idx) => {
        return (
          <SettingsHistoryRow
            key={idx}
            current={Object.is(api.history, item)}
            time={item.time}
            duration={item.encounter.duration}
            zone={item.encounter.zoneName}
            onClick={() => api.showHistory(idx)}
          />
        );
      })}
      <div className='settings-history-space'></div>
    </div>
  );
}

export default observer(SettingsHistory);
