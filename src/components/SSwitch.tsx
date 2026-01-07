import './SSwitch.scss';
import { ICheckmark, IClose } from '@/assets/icons';
import clsx from 'clsx';

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
    <div className={clsx('s-switch', className)}>
      <div
        className={clsx('btn', 's-switch-btn', {
          's-switch-btn--active': value,
        })}
        onClick={() => onChange(true)}
      >
        <ITrue />
      </div>
      <div
        className={clsx('btn', 's-switch-btn', {
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
