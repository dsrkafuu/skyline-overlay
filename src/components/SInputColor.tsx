import './SInputColor.scss';
import { useOutsideClick } from '@/hooks';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';

interface SInputColorProps {
  value: RGBAColor;
  position?: 'top' | 'bottom';
  icon?: React.ReactNode;
  onChange: (value: RGBAColor) => void;
  className?: string;
}

function SInputColor({
  value,
  onChange,
  position = 'top',
  icon,
  className,
}: SInputColorProps) {
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
        <div
          className={clsx(
            's-input-color-popover',
            `s-input-color-popover-${position}`
          )}
        >
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
