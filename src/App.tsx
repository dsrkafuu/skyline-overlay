import { observer } from 'mobx-react-lite';
import Combatant from './views/Combatant';
import Encounter from './views/Encounter';
import Settings from './views/Settings';
import useStore from './hooks/useStore';
import useMock from './hooks/useMock';

const App = observer(() => {
  const {
    api: { overlay },
  } = useStore();

  // debug mock data
  useMock(overlay, false);

  return (
    <div className='app'>
      <div className='s-container'>
        <Combatant />
      </div>
      <div className='s-container'>
        <Encounter />
      </div>
      <div className='s-container'>
        <Settings />
      </div>
    </div>
  );
});

export default App;
