import { useMemo } from 'react';
import { IChevronDown, IChevronUp } from '../assets/icons';
import { SInput, SInputNumber, SSelect, SSwitch } from '../components';
import { useAppDispatch, useAppSelector, useTranslation } from '../hooks';
import {
  updateBigNumberMode,
  updatePetMergeID,
  updatePlayerLimit,
  updatePlayerPerRow,
  updateShortNumber,
  updateShowLB,
  updateSort,
  updateYouName,
} from '../store/slices/settings';
import { MAP_SORT_RULE } from '../utils/maps';

function SettingsData() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.settings.sort);
  const playerLimit = useAppSelector((state) => state.settings.playerLimit);
  const playerPerRow = useAppSelector((state) => state.settings.playerPerRow);
  const showLB = useAppSelector((state) => state.settings.showLB);
  const youName = useAppSelector((state) => state.settings.youName);
  const petMergeID = useAppSelector((state) => state.settings.petMergeID);
  const shortNumber = useAppSelector((state) => state.settings.shortNumber);
  const bigNumberMode = useAppSelector((state) => state.settings.bigNumberMode);

  const items = useMemo(
    () => [
      {
        title: t('Sort Rule'),
        render: () => (
          <>
            <SSelect
              className='settings-sort-rule'
              value={sort.key}
              onChange={(key) => dispatch(updateSort({ key }))}
              map={MAP_SORT_RULE}
            />
            <SSwitch
              value={sort.rule < 0}
              onChange={(v) => dispatch(updateSort({ rule: v ? -1 : 1 }))}
              ITrue={IChevronDown}
              IFalse={IChevronUp}
            />
          </>
        ),
      },
      {
        title: t('Max Combatants'),
        render: () => (
          <SInputNumber
            value={playerLimit}
            onChange={(v) => dispatch(updatePlayerLimit(v))}
            min={1}
            max={24}
            step={1}
            accuracy={0}
          />
        ),
      },
      {
        title: t('Max Player Per Row'),
        render: () => (
          <SInputNumber
            value={playerPerRow}
            onChange={(v) => dispatch(updatePlayerPerRow(v))}
            min={1}
            max={48}
            step={1}
            accuracy={0}
          />
        ),
      },
      {
        title: t('Show Limit Break'),
        render: () => (
          <SSwitch value={showLB} onChange={(v) => dispatch(updateShowLB(v))} />
        ),
      },
      {
        title: t('Custom ID'),
        render: () => (
          <SInput
            value={youName}
            onChange={(v) => dispatch(updateYouName(v))}
          />
        ),
      },
      {
        title: t('Pet-Merging ID'),
        render: () => (
          <SInput
            value={petMergeID}
            onChange={(v) => dispatch(updatePetMergeID(v))}
          />
        ),
      },
      {
        title: t('Auto Short Number'),
        render: () => (
          <SSwitch
            value={shortNumber}
            onChange={(v) => dispatch(updateShortNumber(v))}
          />
        ),
      },
      {
        title: t('Big Number Mode'),
        render: () => (
          <SSwitch
            value={bigNumberMode}
            onChange={(v) => dispatch(updateBigNumberMode(v))}
          />
        ),
      },
    ],
    [
      t,
      sort.key,
      sort.rule,
      dispatch,
      playerLimit,
      playerPerRow,
      showLB,
      youName,
      petMergeID,
      shortNumber,
      bigNumberMode,
    ]
  );

  return (
    <div className='settings-data'>
      {items.map(({ title, render }) => (
        <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsData;
