import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Combatant, Encounter, Settings } from './views';
import { overlay } from './utils/overlay';
import { OVERLAY_CALLBACK } from './utils/constants';
import { updateCombat } from './store/slices/combat';

function App() {
  const dispatch = useDispatch();

  // mount overlay event listener
  useEffect(() => {
    window[OVERLAY_CALLBACK] = (obj) => dispatch(updateCombat(obj));
  }, [dispatch]);

  return (
    <Fragment>
      <div className='s-container'>
        <Combatant />
      </div>
      <div className='s-container'>
        <Encounter overlay={overlay} />
      </div>
      <div className='s-container'>
        <Settings />
      </div>
    </Fragment>
  );
}

export default App;
