import { observer } from 'mobx-react-lite';
import cn, { Argument } from 'classnames';
import { SettingsType } from './Settings';

interface SettingsPanelItem {
  title: string;
  render?: () => React.ReactNode;
  customClasses?: Argument | Argument[];
}

export interface SettingsPanelProps {
  type: SettingsType;
  title: string;
  items?: SettingsPanelItem[];
}

/**
 * render custom panel or setting items panel
 */
function SettingsPanel({ type, items }: SettingsPanelProps) {
  return (
    <div className={`settings-${type}`}>
      {items
        ? items.map(({ title, render, customClasses = '' }, idx) => (
            <div
              className={cn('settings-row', customClasses)}
              key={`settings-${idx}`}
            >
              <span className='settings-title'>{title}</span>
              {render ? render() : null}
            </div>
          ))
        : null}
    </div>
  );
}

export default observer(SettingsPanel);
