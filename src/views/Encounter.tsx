import './Encounter.scss';
import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { version } from '../assets/meta';
import {
  IChevronUpCircle,
  IChevronDownCircle,
  ISettings,
} from '../assets/icons';
import { useStore } from '../hooks';
import { fmtDuration, fmtNumber, fmtZoneName } from '../utils/formatters';

function Encounter() {
  const { api, settings } = useStore();
  const { active, encounter, overlay } = api;
  const { showCombatants, shortNumber, toggleShowCombatants } = settings;

  // encounter data
  const duration = fmtDuration(encounter.duration);
  const zoneName = fmtZoneName(encounter.zoneName);

  /**
   * reset all combat data
   */
  const handleEndEncounter = useCallback(async () => {
    await overlay.endEncounter();
  }, [overlay]);

  /**
   * hide or show combatants
   */
  const handleToggleShowCombatants = useCallback(() => {
    toggleShowCombatants();
  }, [toggleShowCombatants]);

  // overflow zonename related
  const [fullZoneName, setFullZoneName] = useState(false);
  const zoneWrapperRef = useRef<HTMLDivElement>(null);
  const zoneInnerRef = useRef<HTMLSpanElement>(null);
  /**
   * if inner text is too long, show full zone name when hovered
   */
  const handleShowFullZoneName = useCallback(() => {
    if (
      zoneWrapperRef.current &&
      zoneInnerRef.current &&
      zoneWrapperRef.current.offsetWidth < zoneInnerRef.current.offsetWidth
    ) {
      setFullZoneName(true);
    }
  }, []);
  const handleHideFullZoneName = useCallback(() => {
    setFullZoneName(false);
  }, []);

  // handle switch team dps/hps
  const [showDHPS, setShowDHPS] = useState<'dps' | 'hps'>('dps');
  const handleSwitchDHPS = useCallback(() => {
    setShowDHPS((prev) => (prev === 'dps' ? 'hps' : 'dps'));
  }, []);
  const totalDPS = encounter[showDHPS] || 0;

  return (
    <div className='encounter'>
      <div
        className={clsx('encounter-duration', {
          'encounter-duration--active': active,
        })}
        onClick={handleEndEncounter}
      >
        <span>{duration}</span>
      </div>
      <div
        className={clsx('encounter-content', {
          'encounter-content--full': fullZoneName,
        })}
      >
        <div
          className='encounter-content-zone'
          ref={zoneWrapperRef}
          onMouseEnter={handleShowFullZoneName}
          onMouseLeave={handleHideFullZoneName}
        >
          <span ref={zoneInnerRef}>{zoneName}</span>
        </div>
        <div className='encounter-content-numbers' onClick={handleSwitchDHPS}>
          <span className='g-number'>{fmtNumber(shortNumber, totalDPS)}</span>
          <span className='g-counter'>{showDHPS.toUpperCase()}</span>
        </div>
      </div>
      <div className='encounter-btns'>
        <div className='encounter-btn' onClick={handleToggleShowCombatants}>
          {showCombatants ? <IChevronUpCircle /> : <IChevronDownCircle />}
        </div>
        <div
          className='encounter-btn'
          onClick={() => settings.toggleSettings()}
        >
          <ISettings />
        </div>
      </div>
    </div>
  );
}

export default observer(Encounter);
