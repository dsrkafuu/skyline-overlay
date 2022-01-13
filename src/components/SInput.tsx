import './SInput.scss';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '../hooks';
import { ICreate } from '../assets/icons';

interface SInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function SInput({ value, onChange, className }: SInputProps) {
  const t = useTranslation();
  const [focused, setFocused] = useState(false);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClick = useCallback(() => {
    const ret = prompt(t('Please enter the new value'), value) || '';
    const str = `${ret}`.trim();
    if (ret && str) {
      onChange(str);
    }
  }, [onChange, t, value]);

  return (
    <div className={clsx('s-input', className)}>
      <div className='s-input-btn' onClick={handleClick}>
        <ICreate />
      </div>
      <input
        className={clsx('s-input-inner', { 's-input-inner--active': focused })}
        value={value}
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type='text'
        autoComplete='off'
      />
    </div>
  );
}

export default SInput;
