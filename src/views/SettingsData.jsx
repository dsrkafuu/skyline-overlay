import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { SSwitch, SInputNumber } from '@/components';
import { IChevronDown, IChevronUp } from '@/assets/svgs';
import useStore from '@/hooks/useStore';

const SettingsData = observer(() => {
  const { t } = useTranslation();
  const { settings } = useStore();

  const { sortRule, playerLimit, showLB, showTickers, showHPS, extendDetail } = settings;
  const {
    updateSortRule,
    updatePlayerLimit,
    updateShowLB,
    updateShowTickers,
    updateShowHPS,
    updateExtendDetail,
  } = settings;

  return (
    <div className='settings-data'>
      <div className='settings-row'>
        <span className='settings-title'>{t('Sort Rule')}</span>
        <SSwitch
          value={sortRule.value < 0}
          onChange={(value) => updateSortRule({ key: 'dps', value: value ? -1 : 1 })}
          ITrue={IChevronDown}
          IFalse={IChevronUp}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Max Combatants')}</span>
        <SInputNumber
          value={playerLimit}
          onChange={(value) => updatePlayerLimit(value)}
          min={1}
          max={24}
          step={1}
          accuracy={0}
        />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Limit Break')}</span>
        <SSwitch value={showLB} onChange={(value) => updateShowLB(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show Tickers')}</span>
        <SSwitch value={showTickers} onChange={(value) => updateShowTickers(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show HPS')}</span>
        <SSwitch value={showHPS} onChange={(value) => updateShowHPS(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Extend Detail')}</span>
        <SSwitch value={extendDetail} onChange={(value) => updateExtendDetail(value)} />
      </div>
    </div>
  );
});
SettingsData.displayName = 'SettingsData';

export default SettingsData;
