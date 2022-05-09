import { useMemo } from 'react';
import { SSelect, SSwitch } from '../components';
import { useAppDispatch, useAppSelector, useTranslation } from '../hooks';
import {
  updateBottomDisp,
  updateDispContent,
  updateDispMode,
  updateHlYou,
  updateShortName,
  updateTicker,
  updateTickerAlign,
} from '../store/slices/settings';
import {
  MAP_DISPLAY_MODE,
  MAP_DISPLAY_CONTENT,
  MAP_TICKER,
  MAP_TICKER_ALIGN,
  MAP_BOTTOM_DISP,
  MAP_SHORT_NAME,
} from '../utils/maps';

function SettingsDisplay() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const dispMode = useAppSelector((state) => state.settings.dispMode);
  const dispContent = useAppSelector((state) => state.settings.dispContent);
  const hlYou = useAppSelector((state) => state.settings.hlYou);
  const ticker = useAppSelector((state) => state.settings.ticker);
  const tickerAlign = useAppSelector((state) => state.settings.tickerAlign);
  const bottomDisp = useAppSelector((state) => state.settings.bottomDisp);
  const shortName = useAppSelector((state) => state.settings.shortName);

  const items = useMemo(
    () => [
      {
        title: t('Display Mode'),
        render: () => (
          <SSelect
            value={dispMode}
            onChange={(v) => dispatch(updateDispMode(v))}
            map={MAP_DISPLAY_MODE}
          />
        ),
      },
      {
        title: t('Display Content'),
        render: () => (
          <>
            <SSelect
              className='settings-display-content'
              value={dispContent.left}
              onChange={(left) => dispatch(updateDispContent({ left }))}
              disabled={dispMode === 'single'}
              map={MAP_DISPLAY_CONTENT}
            />
            <SSelect
              className='settings-display-content'
              value={dispContent.right}
              onChange={(right) => dispatch(updateDispContent({ right }))}
              map={MAP_DISPLAY_CONTENT}
            />
          </>
        ),
      },
      {
        title: t('Highlight Self'),
        render: () => (
          <SSwitch value={hlYou} onChange={(v) => dispatch(updateHlYou(v))} />
        ),
      },
      {
        title: t('Tickers Display'),
        render: () => (
          <>
            <SSelect
              className='settings-ticker-display'
              value={ticker.top}
              onChange={(top) => dispatch(updateTicker({ top }))}
              map={MAP_TICKER}
              position='top'
            />
            <SSelect
              className='settings-ticker-display'
              value={ticker.bottom}
              onChange={(bottom) => dispatch(updateTicker({ bottom }))}
              map={MAP_TICKER}
              position='top'
            />
          </>
        ),
      },
      {
        title: t('Tickers Align'),
        render: () => (
          <>
            <SSelect
              className='settings-ticker-align'
              value={tickerAlign.top}
              onChange={(top) => dispatch(updateTickerAlign({ top }))}
              disabled={ticker.top === 'none'}
              map={MAP_TICKER_ALIGN}
              position='top'
            />
            <SSelect
              className='settings-ticker-align'
              value={tickerAlign.bottom}
              onChange={(bottom) => dispatch(updateTickerAlign({ bottom }))}
              disabled={ticker.bottom === 'none'}
              map={MAP_TICKER_ALIGN}
              position='top'
            />
          </>
        ),
      },
      {
        title: t('Bottom Display'),
        render: () => (
          <SSelect
            value={bottomDisp}
            onChange={(v) => dispatch(updateBottomDisp(v))}
            map={MAP_BOTTOM_DISP}
            position='top'
          />
        ),
      },
      {
        title: t('Shorten Name'),
        render: () => (
          <SSelect
            value={shortName}
            onChange={(v) => dispatch(updateShortName(v))}
            map={MAP_SHORT_NAME}
            position='top'
          />
        ),
      },
    ],
    [
      t,
      dispatch,
      dispMode,
      dispContent,
      hlYou,
      ticker,
      tickerAlign,
      bottomDisp,
      shortName,
    ]
  );

  return (
    <div className='settings-display'>
      {items.map(({ title, render }) => (
        <div className='settings-row' key={title}>
          <span className='settings-title'>{title}</span>
          {render()}
        </div>
      ))}
    </div>
  );
}

export default SettingsDisplay;
