import React, { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './SSelect.scss';
import { IChevronDown, IChevronUp } from '../assets/icons';

export interface SSelectMap {
  [key: string]: {
    text: string; // text to display
    data?: unknown; // extendable data for custom maps
  };
}

interface SSelectProps {
  value: string; // selected value (map's key)
  onChange: (value: string, data?: unknown) => void;
  map: SSelectMap;
}

function SSelect({ value, onChange, map }: SSelectProps) {
  const transRef = useRef<HTMLDivElement>(null); // ref for react-transition-group

  const [active, setActive] = useState(false);

  const handleChange = useCallback(
    (value: string, data?: unknown) => {
      setActive(false);
      onChange(value, data);
    },
    [onChange]
  );

  return (
    <div className='s-select'>
      <div className={cn('s-select-value', { active })} onClick={() => setActive((val) => !val)}>
        <div className='disp'>{map[value] ? map[value].text : 'Unknown'}</div>
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
              {map[key] ? map[key].text : 'Unknown'}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}

export default SSelect;
