import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { SSwitch, SInputNumber, SSelect, SInput } from '@/components';
import { IChevronDown, IChevronUp } from '@/assets/icons';
import useStore from '@/hooks/useStore';
import { MAP_BOTTOM_DISP } from '@/utils/constants';

const SettingsData = observer(() => {
  const { t } = useTranslation();
  const { settings } = useStore();

  const { sortRule, playerLimit, showLB, petMergeID, showHPS, extendDetail, bottomDisp } = settings;
  const {
    updateSortRule,
    updatePlayerLimit,
    updateShowLB,
    updatePetMergeID,
    updateShowHPS,
    updateExtendDetail,
    updateBottomDisp,
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
        <span className='settings-title'>{t('Pet-Merging ID')}</span>
        <SInput value={petMergeID} onChange={(value) => updatePetMergeID(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Show HPS')}</span>
        <SSwitch value={showHPS} onChange={(value) => updateShowHPS(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Extend Detail')}</span>
        <SSwitch value={extendDetail} onChange={(value) => updateExtendDetail(value)} />
      </div>
      <div className='settings-row'>
        <span className='settings-title'>{t('Bottom Display')}</span>
        <SSelect
          value={bottomDisp}
          onChange={(val) => updateBottomDisp(val)}
          map={MAP_BOTTOM_DISP}
        />
      </div>
    </div>
  );
});

export default SettingsData;
