import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useLongPress, useTranslation } from '../hooks';
import { IDownload, IUpload, IRefresh } from '../assets/icons';
import {
  importSettings,
  exportSettings,
  clearSettings,
} from '../utils/settings';

function SettingsTransfer() {
  const t = useTranslation();

  const handleExport = useCallback(() => {
    const data = exportSettings();
    if (data) {
      prompt(t('Copy to clipboard using Ctrl+C'), data);
    }
  }, [t]);

  const handleImport = useCallback(() => {
    const data = (prompt(t('Please enter settings data')) || '').trim();
    if (!data) {
      return;
    }
    const res = importSettings(data);
    if (res) {
      window.location.reload();
    } else {
      alert(t('Invalid settings data'));
    }
  }, [t]);

  const handleClear = useCallback(() => {
    clearSettings();
    window.location.reload();
  }, []);
  // clear settings after 5s
  const { onMouseDown, onTouchStart, onMouseUp, onTouchEnd, onMouseLeave } =
    useLongPress(handleClear, { delay: 5000 });
  // rotating icon
  const [rotate, setRotate] = useState(false);
  const onMouseDownRotate = useCallback(
    (e: unknown) => {
      !rotate && setRotate(true);
      onMouseDown(e);
    },
    [onMouseDown, rotate]
  );
  const onTouchStartRotate = useCallback(
    (e: unknown) => {
      !rotate && setRotate(true);
      onTouchStart(e);
    },
    [onTouchStart, rotate]
  );
  const onMouseUpRotate = useCallback(() => {
    rotate && setRotate(false);
    onMouseUp();
  }, [onMouseUp, rotate]);
  const onTouchEndRotate = useCallback(() => {
    rotate && setRotate(false);
    onTouchEnd();
  }, [onTouchEnd, rotate]);
  const onMouseLeaveRotate = useCallback(() => {
    rotate && setRotate(false);
    onMouseLeave();
  }, [onMouseLeave, rotate]);

  return (
    <div className='settings-transfer'>
      <div className='settings-transfer-btn' onClick={handleExport}>
        <IDownload />
      </div>
      <div className='settings-transfer-btn' onClick={handleImport}>
        <IUpload />
      </div>
      <div
        className={clsx('settings-transfer-btn', {
          'settings-transfer-btn-rotate': rotate,
        })}
        onMouseDown={onMouseDownRotate}
        onTouchStart={onTouchStartRotate}
        onMouseUp={onMouseUpRotate}
        onTouchEnd={onTouchEndRotate}
        onMouseLeave={onMouseLeaveRotate}
      >
        <IRefresh />
      </div>
    </div>
  );
}

export default SettingsTransfer;
