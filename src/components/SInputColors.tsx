import './SInputColors.scss';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { SketchPicker } from 'react-color';
import { RGBAColor } from "../utils/type";

interface SInputColorProps {
  count: number;
  values: RGBAColor[];
  onChange: (index: number, value: RGBAColor) => void;
  className?: string;
}

function SInputColors({ values, onChange, className, count }: SInputColorProps) {
  const [colorIndexActive, setColorIndexActive] = useState<number | undefined>(undefined);

  const handleInput = useCallback(
    (index: number) => ({rgb}: {rgb: RGBAColor}) => {
      onChange(index, rgb);
    },
    [onChange, values]
  );

  const handleButtonClick = useCallback((index: number) => {
    setColorIndexActive(index === colorIndexActive ? undefined : index);
  }, [colorIndexActive])

  const colorButtons = Array.from(Array(count).keys()).map((index) => {
    const color = values[index];
    return (
      <div key={index} className={clsx('s-input-color-btn', index === colorIndexActive && 's-input-color-btn--active')} onClick={() => handleButtonClick(index)}>
        <div className='s-input-color-btn-preview' style={{backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}/>
      </div>
    )
  })

  return (
    <div className={clsx('s-input-color', className)}>
      {colorButtons}
      {colorIndexActive !== undefined && (
        <div className='s-input-color-picker'>
          <SketchPicker className='s-input-color-picker-overlay' color={values[colorIndexActive]} onChangeComplete={handleInput(colorIndexActive)} />
        </div>
      )}
    </div>
  );
}

export default SInputColors;
