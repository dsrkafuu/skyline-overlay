import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './SSwitch.scss';

import { ICheckmark, IClose } from '@/assets/svgs';

function SSwitch({ value, onChange }) {
  return (
    <div className='s-switch'>
      <div className={classNames('btn', { active: value })} onClick={() => onChange(true)}>
        <ICheckmark />
      </div>
      <div className={classNames('btn', { active: !value })} onClick={() => onChange(false)}>
        <IClose />
      </div>
    </div>
  );
}

SSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SSwitch;
