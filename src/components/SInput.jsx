import React, { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
      className={classNames('s-input', { active: focused })}
      value={value}
      onInput={handleInput}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      type='text'
      autoComplete='off'
    />
  );
}

SInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(SInput);
