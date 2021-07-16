import React, { memo } from 'react';
import cn from 'classnames';
import './SSwitch.scss';

import { ICheckmark, IClose } from '@/assets/svgs';

function SSwitch({ value, onChange, ITrue = ICheckmark, IFalse = IClose }) {
  return (
    <div className='s-switch'>
      <div className={cn('btn', { active: value })} onClick={() => onChange(true)}>
        <ITrue />
      </div>
      <div className={cn('btn', { active: !value })} onClick={() => onChange(false)}>
        <IFalse />
      </div>
    </div>
  );
}

export default memo(SSwitch);
