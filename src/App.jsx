import React from 'react';
import { observer } from 'mobx-react-lite';
import { Combatant, Encounter, Settings } from './views';
import useStore from './hooks/useStore';
import useMock from './hooks/useMock';

const App = observer(() => {
  const {
    api: { overlay },
    settings: { minimalMode },
  } = useStore();

  // debug mock data
  useMock(overlay);

  return (
    <div className='app'>
      <div className='s-container'>
        <Combatant />
      </div>
      {!minimalMode && (
        <div className='s-container'>
          <Encounter />
        </div>
      )}
      <div className='s-container'>
        <Settings />
      </div>
    </div>
  );
});
App.displayName = 'App';

export default App;
