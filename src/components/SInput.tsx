import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isCEF } from '../utils/env';
import cn from 'classnames';
import './SInput.scss';

interface SInputProps {
  value: string;
  onChange: (value: string) => void;
  props?: unknown[];
}

function SInput({ value, onChange, ...props }: SInputProps) {
  const { t } = useTranslation();
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
    if (isCEF()) {
      const ret = prompt(t('Please enter the new value'), value) || '';
      const str = `${ret}`.trim();
      if (ret && str) {
        onChange(str);
      }
    }
  }, [onChange, t, value]);

  if (isCEF()) {
    return (
      <div className='s-input s-input-cef btn' onClick={handleClick} {...props}>
        {value}
      </div>
    );
  } else {
    return (
      <input
        className={cn('s-input', { active: focused })}
        value={value}
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type='text'
        autoComplete='off'
        {...props}
      />
    );
  }
}

export default SInput;
