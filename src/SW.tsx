import './SW.scss';
import { IClose, IRefresh } from './assets/icons';
import { useAppSelector, useTranslation } from './hooks';
import { logError, logInfo } from './utils/loggers';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function SW() {
  const t = useTranslation();
  const layoutMode = useAppSelector((state) => state.settings.layoutMode);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      logInfo('service worker registered', r);
    },
    onRegisterError(e) {
      logError('service worker registration error', e);
    },
  });

  const handleClose = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setNeedRefresh, setOfflineReady]);

  return offlineReady || needRefresh ? (
    <div
      className={clsx({
        sw: true,
        'sw-reverse': layoutMode === 'reverse',
      })}
    >
      <div className='sw-text'>
        {offlineReady
          ? t('App Ready to Work Offline')
          : t('Refresh to New Version Available')}
      </div>
      {offlineReady ? (
        <div className='sw-btn' onClick={handleClose}>
          <IClose />
        </div>
      ) : (
        <div className='sw-btn' onClick={() => updateServiceWorker(true)}>
          <IRefresh />
        </div>
      )}
    </div>
  ) : null;
}

export default SW;
