import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isCEF } from '@/utils/env';
import cn from 'classnames';
import './SInput.scss';

function SInput({ value, onChange }) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);

  /**
   * @param {React.BaseSyntheticEvent} e
   */
  const handleInput = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  /**
   * handle click in cef env
   */
  const handleClick = useCallback(() => {
    if (isCEF()) {
      const ret = prompt(t('Please enter the new value'), value);
      const str = `${ret}`.trim();
      if (ret && str) {
        onChange(str);
      }
    }
  }, [onChange, t, value]);

  if (isCEF()) {
    return (
      <div className='s-input s-input-cef btn' onClick={handleClick}>
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
      />
    );
  }
}

export default memo(SInput);
