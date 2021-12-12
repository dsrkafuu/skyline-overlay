import './SSwitch.scss';
import cn from 'classnames';
import { ICheckmark, IClose } from '../assets/icons';

interface SSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  ITrue?: React.FC;
  IFalse?: React.FC;
  className?: string;
}

function SSwitch({
  value,
  onChange,
  ITrue = ICheckmark,
  IFalse = IClose,
  className,
}: SSwitchProps) {
  return (
    <div className={cn('s-switch', className)}>
      <div
        className={cn('btn', 's-switch-btn', { 's-switch-btn--active': value })}
        onClick={() => onChange(true)}
      >
        <ITrue />
      </div>
      <div
        className={cn('btn', 's-switch-btn', {
          's-switch-btn--active': !value,
        })}
        onClick={() => onChange(false)}
      >
        <IFalse />
      </div>
    </div>
  );
}

export default SSwitch;
