import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import cloneDeep from 'lodash/cloneDeep';
import './Combatant.scss';
import CombatantGrid from './CombatantGrid';
import useStore from '@/hooks/useStore';
import { fmtMergePet } from '@/utils/formatters';

const Combatant = observer(() => {
  // get data from store
  const {
    api: { combatant, lb },
    settings: { sortRule, playerLimit, showLB, petMergeID, toggleMinimalMode },
  } = useStore();

  // parse combatant settings
  const sortedTemp = cloneDeep(combatant).sort(
    (a, b) => sortRule.value * (a[sortRule.key] - b[sortRule.key])
  );
  let sortedCombatant = [];
  for (let i = 0; i < playerLimit; i++) {
    sortedTemp[i] && sortedTemp[i].name && sortedCombatant.push(sortedTemp[i]);
  }
  if (showLB && lb && lb.name === 'Limit Break') {
    sortedCombatant.push(cloneDeep(lb));
  }

  if (petMergeID) {
    sortedCombatant = fmtMergePet(sortedCombatant, petMergeID);
  }

  const handleSwitchMinimalMode = useCallback(
    (e) => {
      e.preventDefault();
      toggleMinimalMode();
    },
    [toggleMinimalMode]
  );

  return (
    <>
      {Boolean(combatant) && combatant.length > 0 && (
        <div className='combatant' onContextMenu={handleSwitchMinimalMode}>
          {sortedCombatant.map((value, index) => (
            <CombatantGrid player={value} index={index} key={value.name} />
          ))}
        </div>
      )}
    </>
  );
});

export default Combatant;
