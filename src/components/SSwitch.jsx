import React, { memo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './SSwitch.scss';

import { ICheckmark, IClose } from '@/assets/svgs';

function SSwitch({ value, onChange, ITrue = ICheckmark, IFalse = IClose }) {
  return (
    <div className='s-switch'>
      <div className={classNames('btn', { active: value })} onClick={() => onChange(true)}>
        <ITrue />
      </div>
      <div className={classNames('btn', { active: !value })} onClick={() => onChange(false)}>
        <IFalse />
      </div>
    </div>
  );
}

SSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  ITrue: PropTypes.elementType,
  IFalse: PropTypes.elementType,
};

export default memo(SSwitch);
