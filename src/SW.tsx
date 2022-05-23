import './SW.scss';
import { useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { logError, logInfo } from './utils/loggers';
import { IClose, IRefresh } from './assets/icons';

function SW() {
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
    <div className='sw'>
      <div className='sw-text'>
        {offlineReady
          ? 'App Ready to Work Offline'
          : 'Refresh to New Version Available'}
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
