import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './SSelect.scss';

import { IChevronDown, IChevronUp } from '@/assets/svgs';

function SSelect({ value, onChange, kvPairs }) {
  const transRef = useRef(); // ref for react-transition-group

  const [active, setActive] = useState(false);
  const dispText = (() => {
    let s = '';
    for (let i = 0; i < kvPairs.length; i++) {
      if (kvPairs[i][0] === value) {
        s = kvPairs[i][1];
        return s;
      }
    }
    return s;
  })();

  /**
   * @param {string} value
   */
  function handleChange(value) {
    setActive(false);
    onChange(value);
  }

  return (
    <div className='s-select'>
      <div
        className={classNames('s-select-value', { active })}
        onClick={() => setActive((val) => !val)}
      >
        <div className='disp'>{dispText}</div>
        <div className='btn'>{active ? <IChevronUp /> : <IChevronDown />}</div>
      </div>
      <CSSTransition classNames='fade' in={active} timeout={150} unmountOnExit nodeRef={transRef}>
        <div className='s-select-options' ref={transRef}>
          {kvPairs.map((pair) => (
            <div className='s-select-option' onClick={() => handleChange(pair[0])} key={pair[0]}>
              {pair[1]}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}

SSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  kvPairs: PropTypes.array.isRequired,
};

export default SSelect;
