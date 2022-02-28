import { Observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { SettingsType } from './Settings';

interface SettingsPanelItem {
  title: string;
  render?: () => React.ReactElement;
  observe?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface SettingsPanelProps {
  type: SettingsType;
  title: string;
  items?: SettingsPanelItem[];
}

/**
 * render custom panel or setting items panel,
 * `false` observe means store is not used in render func,
 * which leads to render func not wrapped by `Observer`
 */
function SettingsPanel({ type, items }: SettingsPanelProps) {
  return (
    <div className={`settings-${type}`}>
      {items &&
        items.map(({ title, render, observe, className, disabled }, idx) => (
          <div
            className={clsx(
              'settings-row',
              { 'settings-row--disabled': disabled },
              className
            )}
            key={`settings-${idx}`}
          >
            <span className='settings-title'>{title}</span>
            {render &&
              (observe === false ? render() : <Observer>{render}</Observer>)}
          </div>
        ))}
    </div>
  );
}

// no `observe` needed since accessing title happens in parent component
export default SettingsPanel;
