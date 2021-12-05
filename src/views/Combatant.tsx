import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import { observer } from 'mobx-react-lite';
import cloneDeep from 'lodash/cloneDeep';
import './Combatant.scss';
import CombatantGrid from './CombatantGrid';
import { useStore } from '../hooks';
import { fmtMergePet } from '../utils/formatters';

function Combatant() {
  // get data from store
  const {
    api: { combatant, lb },
    settings: { sort, playerLimit, showLB, petMergeID },
  } = useStore();
  let players: Array<CombatantData | LimitBreakData> = cloneDeep(combatant);

  // merge pet if enabled
  if (petMergeID) {
    players = fmtMergePet(players, petMergeID);
  }

  // sort combatant
  players.sort((a, b) => sort.rule * (a[sort.key] - b[sort.key]));

  // limit combatants
  const temp = players;
  players = [];
  for (let i = 0; i < playerLimit; i++) {
    temp[i] && temp[i].name && players.push(temp[i]);
  }

  // add lb if enabled
  if (showLB && lb && lb.name === 'Limit Break') {
    players.push(cloneDeep(lb));
  }

  return (
    <>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant'>
          {players.map((player, index) => (
            <CombatantGrid player={player} index={index} key={player.name} />
          ))}
        </div>
      )}
    </>
  );
}

export default observer(Combatant);
