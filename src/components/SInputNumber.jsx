import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './SInputNumber.scss';

import { IAdd, IRemove } from '@/assets/svgs';

function SNumber({ value, onChange, min = 0, max = 100, step = 1, accuracy = 0 }) {
  const dispValue = value.toFixed(accuracy);

  const handlePlus = useCallback(() => {
    let newValue = value + step;
    if (!Number.isNaN(accuracy)) {
      newValue = Number(newValue.toFixed(accuracy));
    }
    if (newValue <= max || newValue - max < Number.EPSILON) {
      onChange(newValue);
    }
  }, [accuracy, max, onChange, step, value]);

  const handleMinus = useCallback(() => {
    let newValue = value - step;
    if (!Number.isNaN(accuracy)) {
      newValue = Number(newValue.toFixed(accuracy));
    }
    if (newValue >= min || min - newValue < Number.EPSILON) {
      onChange(newValue);
    }
  }, [accuracy, min, onChange, step, value]);

  return (
    <div className='s-input-number'>
      <div className='value'>{dispValue}</div>
      <div className='btn plus' onClick={handlePlus}>
        <IAdd />
      </div>
      <div className='btn minus' onClick={handleMinus}>
        <IRemove />
      </div>
    </div>
  );
}

SNumber.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  accuracy: PropTypes.number,
};

export default memo(SNumber);
