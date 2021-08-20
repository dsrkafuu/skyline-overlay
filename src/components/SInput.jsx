import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const doPrompt = function(){
    const ret=prompt(t('Please enter the new setting value'),value);
    return ret?ret:value;
  }

  return (
    <input
      className={cn('s-input', { active: focused })}
      value={value}
      onInput={handleInput}
      onClick={() => {onChange(doPrompt())}}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      type='text'
      autoComplete='off'
    />
  );
}

export default memo(SInput);
