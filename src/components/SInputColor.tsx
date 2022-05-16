import './SInputColor.scss';
import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { RgbaColorPicker } from 'react-colorful';
import { useOutsideClick } from '../hooks';

interface SInputColorProps {
  value: RGBAColor;
  icon?: React.ReactNode;
  onChange: (value: RGBAColor) => void;
  className?: string;
}

function SInputColor({ value, onChange, icon, className }: SInputColorProps) {
  const [opened, setOpened] = useState(false);
  const toggleOpened = useCallback(() => setOpened(!opened), [opened]);

  const clickRef = useRef<HTMLDivElement>(null);
  useOutsideClick(clickRef, () => {
    setOpened(false);
  });

  const a = value[3];
  const bgColor = `rgba(${value[0]}, ${value[1]}, ${value[2]}, ${a || 1})`;

  return (
    <div className={clsx('s-input-color', className)} ref={clickRef}>
      <div
        className='s-input-color-swatch'
        style={{ backgroundColor: bgColor }}
        onClick={toggleOpened}
      >
        {icon}
      </div>
      {opened && (
        <div className='s-input-color-popover'>
          <RgbaColorPicker
            color={{
              r: value[0],
              g: value[1],
              b: value[2],
              a: a || 1,
            }}
            onChange={(v) => onChange([v.r, v.g, v.b, v.a])}
          />
        </div>
      )}
    </div>
  );
}

export default SInputColor;
