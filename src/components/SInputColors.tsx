import './SInputColors.scss';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { SketchPicker } from 'react-color';
import { RGBAColor } from "../types/configuration";

interface SInputColorProps {
  values: {[k: string]: RGBAColor};
  onChange: (key: string, value: RGBAColor) => void;
  className?: string;
}

function SInputColors({ values, onChange, className }: SInputColorProps) {
  const [colorActive, setColorActive] = useState<string | undefined>(undefined);

  const handleInput = useCallback(
    (key: string) => ({rgb}: {rgb: RGBAColor}) => {
      onChange(key, rgb);
    },
    [onChange, values]
  );

  const handleButtonClick = useCallback((key: string) => {
    setColorActive(key === colorActive ? undefined : key);
  }, [colorActive])

  const colorButtons = Object.keys(values).map((index) => {
    const color = values[index];
    return (
      <div key={index} className={clsx('s-input-color-btn', index === colorActive && 's-input-color-btn--active')} onClick={() => handleButtonClick(index)}>
        <div className='s-input-color-btn-preview' style={{backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}/>
      </div>
    )
  })

  return (
    <div className={clsx('s-input-color', className)}>
      {colorButtons}
      {colorActive !== undefined && (
        <div className='s-input-color-picker'>
          <div className='s-input-color-picker-title'>
            {colorActive.split('-').join(' ')}
          </div>
          <SketchPicker className='s-input-color-picker-overlay' color={values[colorActive]} onChangeComplete={handleInput(colorActive)} />
        </div>
      )}
    </div>
  );
}

export default SInputColors;
