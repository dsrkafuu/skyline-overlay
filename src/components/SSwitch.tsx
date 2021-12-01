import cn from 'classnames';
import './SSwitch.scss';
import { ICheckmark, IClose } from '../assets/icons';

interface SSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  ITrue?: React.FC;
  IFalse?: React.FC;
}

function SSwitch({
  value,
  onChange,
  ITrue = ICheckmark,
  IFalse = IClose,
}: SSwitchProps) {
  return (
    <div className='s-switch'>
      <div
        className={cn('btn', { active: value })}
        onClick={() => onChange(true)}
      >
        <ITrue />
      </div>
      <div
        className={cn('btn', { active: !value })}
        onClick={() => onChange(false)}
      >
        <IFalse />
      </div>
    </div>
  );
}

export default SSwitch;
