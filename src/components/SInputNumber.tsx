import './SInputNumber.scss';
import { IAdd, IRemove } from '@/assets/icons';
import clsx from 'clsx';
import { useCallback } from 'react';

interface SInputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  accuracy?: number;
  className?: string;
}

function SInputNumber({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  accuracy = 0,
  className,
}: SInputNumberProps) {
  const dispValue = value.toFixed(accuracy);

  const handlePlus = useCallback(() => {
    let newValue = value + step;
    if (!Number.isNaN(accuracy)) {
      newValue = Number(newValue.toFixed(accuracy));
    }
    if (newValue <= max || newValue - max < Number.EPSILON) {
      onChange(newValue);
    }
  }, [accuracy, max, onChange, step, value]);

  const handleMinus = useCallback(() => {
    let newValue = value - step;
    if (!Number.isNaN(accuracy)) {
      newValue = Number(newValue.toFixed(accuracy));
    }
    if (newValue >= min || min - newValue < Number.EPSILON) {
      onChange(newValue);
    }
  }, [accuracy, min, onChange, step, value]);

  return (
    <div className={clsx('s-input-number', className)}>
      <div className='value'>{dispValue}</div>
      <div className='btn plus' onClick={handlePlus}>
        <IAdd />
      </div>
      <div className='btn minus' onClick={handleMinus}>
        <IRemove />
      </div>
    </div>
  );
}

export default SInputNumber;
