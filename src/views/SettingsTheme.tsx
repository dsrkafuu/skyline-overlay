import { useCallback, useMemo } from 'react';
import { SInputColor, SSelect, SSelectMap } from '../components';
import {
  useAppDispatch,
  useAppSelector,
  useColor,
  useTranslation,
} from '../hooks';
import * as jobIcons from '../assets/jobs';
import { IRefresh } from '../assets/icons';
import {
  updateColors,
  updateTheme,
  updateThemeMode,
} from '../store/slices/theme';
import { MAP_THEMES, MAP_THEME_MODE, ThemeModeMapKey } from '../utils/maps';
import themes from '../themes';

function SettingsTheme() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const themeModeMap = useMemo(() => {
    const map = {} as SSelectMap;
    map.role = MAP_THEME_MODE.role;
    if (themes[theme].data.colors.job) {
      map.job = MAP_THEME_MODE.job;
    }
    return map;
  }, [theme]);

  const handleResetColors = useCallback(() => {
    dispatch(updateColors(null));
  }, [dispatch]);

  const commonCl = useColor((c) => c.common);
  const selfCl = useColor((c) => c.self);
  const tickerCls = useColor((c) => c.ticker);
  const roleCls = useColor((c) => c.role);
  const jobCls = useColor((c) => c.job);
  const themeCls = useColor((c) => c.theme);

  const items = useMemo(() => {
    const ret = [
      {
        title: t('Theme'),
        render: () => (
          <SSelect
            className='settings-theme-input'
            value={theme}
            onChange={(v) => dispatch(updateTheme(v))}
            map={MAP_THEMES}
          />
        ),
      },
      {
        title: t('Theme Mode'),
        render: () => (
          <>
            <SSelect
              value={themeMode}
              onChange={(v) => dispatch(updateThemeMode(v as ThemeModeMapKey))}
              map={themeModeMap}
              disabled={Object.keys(themeModeMap).length < 2}
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
    const roleKeys = Object.keys(roleCls || {});
    if (roleCls && roleKeys.length > 0) {
      ret.push({
        title: t('Roles'),
        render: () =>
          Object.keys(roleCls).map((key) => (
            <SInputColor
              key={key}
              value={roleCls[key as keyof typeof roleCls]}
              onChange={(v) => dispatch(updateColors({ role: { [key]: v } }))}
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
    roleCls,
    jobCls,
    themeCls,
    theme,
    dispatch,
    themeMode,
    themeModeMap,
    handleResetColors,
    commonCl,
    selfCl,
    tickerCls,
  ]);

  return (
    <div className='settings-theme'>
      {items.map(({ title, render }) => (
        <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsTheme;
