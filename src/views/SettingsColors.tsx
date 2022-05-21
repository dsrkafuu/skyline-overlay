import { useCallback, useMemo } from 'react';
import { SInputColor, SSelect, SSelectMap } from '../components';
import {
  useAppDispatch,
  useAppSelector,
  useColor,
  useTranslation,
} from '../hooks';
import { updateColors, updatePreset } from '../store/slices/colors';
import themes from '../themes';
import * as jobIcons from '../assets/jobs';
import { IRefresh } from '../assets/icons';

function SettingsColors() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const preset = useAppSelector((state) => state.colors.preset);
  const presetsMap = useMemo(() => {
    const map = {} as SSelectMap;
    for (const item of themes[theme].data.presets) {
      map[item.key] = { text: item.name };
    }
    return map;
  }, [theme]);

  const handleResetColors = useCallback(() => {
    dispatch(updateColors(null));
  }, [dispatch]);

  const commonCl = useColor((c) => c.common);
  const selfCl = useColor((c) => c.self);
  const tickerCls = useColor((c) => c.ticker);
  const jobtypeCls = useColor((c) => c.jobtype);
  const jobCls = useColor((c) => c.job);
  const themeCls = useColor((c) => c.theme);

  const items = useMemo(() => {
    const ret = [
      {
        title: t('Preset'),
        render: () => (
          <>
            <SSelect
              value={preset}
              onChange={(key) => dispatch(updatePreset(key as string))}
              map={presetsMap}
              disabled={Object.keys(presetsMap).length < 2}
            />
            <div className='settings-btn' onClick={handleResetColors}>
              <IRefresh />
            </div>
          </>
        ),
      },
      {
        title: t('Common'),
        render: () => (
          <SInputColor
            value={commonCl}
            onChange={(v) => dispatch(updateColors({ common: v }))}
          />
        ),
      },
      {
        title: t('Self Highlighting'),
        render: () => (
          <SInputColor
            value={selfCl}
            onChange={(v) => dispatch(updateColors({ self: v }))}
          />
        ),
      },
      {
        title: t('Tickers'),
        render: () =>
          Object.keys(tickerCls).map((key) => (
            <SInputColor
              key={key}
              value={tickerCls[key as keyof typeof tickerCls]}
              onChange={(v) => dispatch(updateColors({ ticker: { [key]: v } }))}
            />
          )),
      },
    ];
    const jobtypeKeys = Object.keys(jobtypeCls || {});
    if (jobtypeCls && jobtypeKeys.length > 0) {
      ret.push({
        title: t('Job Types'),
        render: () =>
          Object.keys(jobtypeCls).map((key) => (
            <SInputColor
              key={key}
              value={jobtypeCls[key as keyof typeof jobtypeCls]}
              onChange={(v) =>
                dispatch(updateColors({ jobtype: { [key]: v } }))
              }
            />
          )),
      });
    }
    const jobKeys = Object.keys(jobCls || {});
    if (jobCls && jobKeys.length > 0) {
      ret.push({
        title: t('Jobs'),
        render: () => (
          <div className='settings-colors-grid'>
            {Object.keys(jobCls).map((key) => {
              const Icon =
                jobIcons[
                  String.prototype.toUpperCase.apply(
                    key
                  ) as keyof typeof jobIcons
                ] || jobIcons.FFXIV;
              return (
                <SInputColor
                  key={key}
                  value={jobCls[key as keyof typeof jobCls]}
                  icon={<Icon />}
                  onChange={(v) =>
                    dispatch(updateColors({ job: { [key]: v } }))
                  }
                />
              );
            })}
          </div>
        ),
      });
    }
    const themeKeys = Object.keys(themeCls || {});
    if (themeCls && themeKeys.length > 0) {
      ret.push({
        title: t('Theme Customization'),
        render: () => (
          <div className='settings-colors-grid'>
            {Object.keys(themeCls).map((key) => (
              <SInputColor
                key={key}
                value={themeCls[key as keyof typeof themeCls]}
                onChange={(v) =>
                  dispatch(updateColors({ theme: { [key]: v } }))
                }
              />
            ))}
          </div>
        ),
      });
    }
    return ret;
  }, [
    t,
    dispatch,
    preset,
    presetsMap,
    selfCl,
    commonCl,
    tickerCls,
    jobtypeCls,
    jobCls,
    themeCls,
    handleResetColors,
  ]);

  return (
    <div className='settings-colors'>
      {items.map(({ title, render }) => (
        <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsColors;
