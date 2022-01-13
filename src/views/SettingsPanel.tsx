import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { SettingsType } from './Settings';

interface SettingsPanelItem {
  title: string;
  render?: () => React.ReactNode;
  className?: string;
  disabled?: boolean;
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
        ? items.map(({ title, render, className, disabled }, idx) => (
            <div
              className={clsx(
                'settings-row',
                { 'settings-row--disabled': disabled },
                className
              )}
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
