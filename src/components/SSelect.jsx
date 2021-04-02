import React, { memo, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './SSelect.scss';

import { IChevronDown, IChevronUp } from '@/assets/svgs';

function SSelect({ value, onChange, map }) {
  const transRef = useRef(); // ref for react-transition-group

  const [active, setActive] = useState(false);

  /**
   * @param {string} value
   * @param {any} data
   */
  const handleChange = useCallback(
    (value, data) => {
      setActive(false);
      onChange(value, data);
    },
    [onChange]
  );

  return (
    <div className='s-select'>
      <div
        className={classNames('s-select-value', { active })}
        onClick={() => setActive((val) => !val)}
      >
        <div className='disp'>{map[value].text}</div>
        <div className='btn'>{active ? <IChevronUp /> : <IChevronDown />}</div>
      </div>
      <CSSTransition classNames='fade' in={active} timeout={150} unmountOnExit nodeRef={transRef}>
        <div className='s-select-options' ref={transRef}>
          {Object.keys(map).map((key) => (
            <div
              className='s-select-option'
              onClick={() => handleChange(key, map[key].data)}
              key={key}
            >
              {map[key].text}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}

SSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  map: PropTypes.shape({
    [PropTypes.oneOfType([PropTypes.string, PropTypes.number])]: PropTypes.shape({
      text: PropTypes.string.isRequired,
      data: PropTypes.any,
    }),
  }).isRequired,
};

export default memo(SSelect);
