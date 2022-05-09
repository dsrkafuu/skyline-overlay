import { useMemo } from 'react';
import clsx from 'clsx';
import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';
import { useAppDispatch, useAppSelector } from '../hooks';
import { MAP_SHORT_NAME } from '../utils/maps';
import { toggleBlurName } from '../store/slices/settings';

interface CombatantNameProps {
  player: CombatantData | LimitBreakData;
}

function CombatantName({ player }: CombatantNameProps) {
  const dispatch = useAppDispatch();
  const blurName = useAppSelector((state) => state.settings.blurName);
  const youName = useAppSelector((state) => state.settings.youName);
  const shortName = useAppSelector((state) => state.settings.shortName);

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
      className={clsx('combatant-name', { 'combatant-name--blured': blurName })}
      onClick={() => dispatch(toggleBlurName())}
    >
      {displayName}
    </div>
  );
}

export default CombatantName;
