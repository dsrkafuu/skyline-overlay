import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import useStore from '../hooks/useStore';
import { MAP_SHORT_NAME } from '../utils/constants';

interface CombatantNameProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function CombatantName({ player, index }: CombatantNameProps) {
  const { settings } = useStore();
  const { blurName, youName, shortName, showRanks } = settings;
  const { toggleBlurName } = settings;

  // gen display name
  const displayName = useMemo(() => {
    let dispName = player.name;
    dispName === 'YOU' && (dispName = youName); // if custom name
    dispName === '' && (dispName = 'YOU'); // prevent empty

    // checker whether to shorten
    const splitName = dispName.split(' ');
    const shortNameCheck = MAP_SHORT_NAME[shortName].data;
    if (splitName.length === 2) {
      shortNameCheck.first &&
        splitName[0].charAt(0) &&
        (splitName[0] = `${splitName[0].charAt(0)}.`);
      shortNameCheck.last &&
        splitName[1].charAt(0) &&
        (splitName[1] = `${splitName[1].charAt(0)}.`);
      dispName = splitName.join(' ');
    }
    showRanks && (dispName = `${index + 1}. ${dispName}`); // if show ranks
    return dispName;
  }, [index, player.name, shortName, showRanks, youName]);

  return (
    <div
      className={cn('combatant-name', { 'combatant-name--blured': blurName })}
      onClick={toggleBlurName}
    >
      {displayName}
    </div>
  );
}

export default observer(CombatantName);
