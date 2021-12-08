import './SInput.scss';
import { useCallback, useState } from 'react';
import { isCEFSharp } from 'ffxiv-overlay-api';
import cn from 'classnames';
import { useTranslation } from '../hooks';

interface SInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const isCEF = isCEFSharp();

function SInput({ value, onChange, className }: SInputProps) {
  const t = useTranslation();
  const [focused, setFocused] = useState(false);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  /**
   * handle click in cef env
   */
  const handleClick = useCallback(() => {
    if (isCEF) {
      const ret = prompt(t('Please enter the new value'), value) || '';
      const str = `${ret}`.trim();
      if (ret && str) {
        onChange(str);
      }
    }
  }, [onChange, t, value]);

  if (isCEF) {
    return (
      <div
        className={cn('s-input s-input-cef btn', className)}
        onClick={handleClick}
      >
        {value}
      </div>
    );
  } else {
    return (
      <input
        className={cn('s-input', { active: focused }, className)}
        value={value}
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type='text'
        autoComplete='off'
      />
    );
  }
}

export default SInput;
