import React from 'react';
import { useTranslation } from 'react-i18next';

import { SSwitch, SInputNumber } from '@/components';
import { IChevronDown, IChevronUp } from '@/assets/svgs';
import useSettings from '@/hooks/useSettings';

function SettingsData() {
  const { t } = useTranslation(); // i18n

  const [sortRule, setSortRule] = useSettings('sortRule');
  const [playerLimit, setPlayerLimit] = useSettings('playerLimit');
  const [showLB, setShowLB] = useSettings('showLB');
  const [showHPS, setShowHPS] = useSettings('showHPS');

  return (
    <div className='settings-data'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Sort Rule')}</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={(value) => setSortRule({ key: 'dps', value: value ? -1 : 1 })}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Max Combatants')}</span>
        <SInputNumber
          value={playerLimit}
          onChange={(value) => setPlayerLimit(value)}
          min={1}
          max={24}
          step={1}
          accuracy={0}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Limit Break')}</span>
        <SSwitch value={showLB} onChange={(value) => setShowLB(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show HPS')}</span>
        <SSwitch value={showHPS} onChange={(value) => setShowHPS(value)} />
      </div>
    </div>
  );
}

export default SettingsData;
