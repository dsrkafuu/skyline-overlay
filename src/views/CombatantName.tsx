import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import { useStore } from '../hooks';
import { MAP_SHORT_NAME } from '../utils/constants';

interface CombatantNameProps {
  player: CombatantData | LimitBreakData;
  index: number;
}

function CombatantName({ player }: CombatantNameProps) {
  const { settings } = useStore();
  const { blurName, youName, shortName } = settings;
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
    return dispName;
  }, [player.name, shortName, youName]);

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
