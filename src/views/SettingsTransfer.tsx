import { useCallback, useState } from 'react';
import { useStore, useLongPress } from '../hooks';
import { IDownload, ICheckmark, IUpload, IRefresh } from '../assets/icons';
import clsx from 'clsx';

function SettingsTransfer() {
  const { settings } = useStore();

  const [exportStatus, setExportStatus] = useState(false);
  const handleExport = useCallback(async () => {
    // do not copy if just copied
    if (exportStatus) {
      return;
    }
    const data = settings.exportSettings();
    let status = true;
    if (data) {
      try {
        await navigator.clipboard.writeText(data);
        status = true;
      } catch {
        status = false;
      }
    }
    // set export status then reset after 2s
    if (status) {
      setExportStatus(true);
      setTimeout(() => setExportStatus(false), 2000);
    }
  }, [exportStatus, settings]);

  const handleImport = useCallback(async () => {
    const data = (prompt('Please enter settings data') || '').trim();
    if (!data) {
      return;
    }
    const res = settings.importSettings(data);
    if (res) {
      location.reload();
    }
  }, [settings]);

  const handleClear = useCallback(() => {
    settings.clearSettings();
    window.location.reload();
  }, [settings]);
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
        {exportStatus ? <ICheckmark /> : <IDownload />}
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
