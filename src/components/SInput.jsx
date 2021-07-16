import React, { memo, useCallback, useState } from 'react';
import cn from 'classnames';
import './SInput.scss';

function SInput({ value, onChange }) {
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

export default memo(SInput);
