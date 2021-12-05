import { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import './SSelect.scss';
import { IChevronDown, IChevronUp } from '../assets/icons';
import { useOutsideClick } from '../hooks';

export interface SSelectMap {
  [key: string]: {
    text: string; // text to display
    data?: unknown; // extendable data for custom maps
  };
}

// type of onChange value is decided from what map keys are passed in
interface SSelectProps<TMap extends SSelectMap> {
  value: string; // selected value (map's key)
  onChange: (value: keyof TMap, data?: unknown) => void;
  map: TMap;
  disabled?: boolean;
  className?: string;
}

function SSelect<TMap extends SSelectMap>({
  value,
  onChange,
  map,
  disabled,
  className,
}: SSelectProps<TMap>) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(
    (value: keyof TMap, data?: unknown) => {
      setActive(false);
      onChange(value, data);
    },
    [onChange]
  );

  const clickRef = useRef<HTMLDivElement>(null);
  useOutsideClick(clickRef, () => {
    setActive(false);
  });

  return (
    <div
      className={cn('s-select', { 's-select--disabled': disabled }, className)}
      ref={clickRef}
    >
      <div
        className={cn('s-select-value', { active })}
        onClick={() => setActive((val) => !disabled && !val)}
      >
        <div className='disp'>{map[value] ? map[value].text : 'Unknown'}</div>
        <div className='btn'>{active ? <IChevronUp /> : <IChevronDown />}</div>
      </div>
      {active && (
        <div className='s-select-options'>
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
      )}
    </div>
  );
}

export default SSelect;
