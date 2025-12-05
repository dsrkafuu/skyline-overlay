import './DevPanel.scss';
import { useCallback, useState } from 'react';
import { getLS, setLS } from './utils/storage';
import { SInput, SSelect, SSwitch } from './components';
import { startMock, stopMock } from './utils/mocker';

const bgImageMap = {
  combat: { text: 'Combat', data: { url: '/devbg/combat.jpg' } },
  housing: { text: 'Housing', data: { url: '/devbg/housing.jpg' } },
  night: { text: 'Night', data: { url: '/devbg/night.jpg' } },
  treasure: { text: 'Treasure', data: { url: '/devbg/treasure.jpg' } },
  none: { text: 'None', data: { url: '' } },
};
export type BGImageMapKey = keyof typeof bgImageMap & string;

const bgSizeMap = {
  native: { text: 'Native', data: { size: '2560px 1440px' } },
  cover: { text: 'Cover', data: { size: 'cover' } },
};
export type BGSizeMapKey = keyof typeof bgSizeMap & string;

interface DevPanelSettings {
  showPanel?: boolean;
  bgImage?: BGImageMapKey;
  bgSize?: BGSizeMapKey;
  bgColor?: string;
}

function getSettings() {
  return {
    showPanel: false,
    bgImage: 'none',
    bgSize: 'native',
    bgColor: 'transparent',
    ...(getLS<DevPanelSettings>('dev') || {}),
  };
}
function setSettings(settings: DevPanelSettings) {
  setLS('dev', {
    ...getSettings(),
    ...settings,
  });
}

interface DevPanelProps {
  children: React.ReactNode;
}

function DevPanel({ children }: DevPanelProps) {
  const [showPanel, setShowPanel] = useState(
    () => getSettings().showPanel || false
  );

  const [bgImage, setBGImage] = useState(() => getSettings().bgImage);
  const [bgSize, setBGSize] = useState(() => getSettings().bgSize);
  const [bgColor, setBGColor] = useState(() => getSettings().bgColor);

  const style = {
    backgroundSize: bgSizeMap[bgSize as BGSizeMapKey]?.data?.size,
    backgroundImage:
      bgImage !== 'none' && bgImageMap[bgImage as BGImageMapKey]?.data?.url
        ? `url(${bgImageMap[bgImage as BGImageMapKey]?.data?.url})`
        : 'none',
    backgroundColor: bgColor,
  };

  const [mocking, setMocking] = useState(false);
  const handleMockingChange = useCallback(async (value: boolean) => {
    if (value) {
      startMock();
      setMocking(true);
    } else {
      stopMock();
      setMocking(false);
    }
  }, []);

  return (
    <div className='devp' style={style}>
      <div className='devp-app'>{children}</div>
      <div className={'devp-settings'}>
        <div
          className='devp-toggle'
          onClick={() =>
            setShowPanel((pre) => {
              const target = !pre;
              setSettings({ showPanel: target });
              return target;
            })
          }
        >
          Dev Panel
        </div>
        {showPanel && (
          <div className='devp-content'>
            <div className='devp-content-row'>
              <div className='devp-content-title'>Trigger Mock Data</div>
              <SSwitch value={mocking} onChange={handleMockingChange} />
            </div>
            <div className='devp-content-row'>
              <div className='devp-content-title'>Background Image</div>
              <SSelect
                className='devp-content-ctrl'
                value={bgImage}
                onChange={(val) => {
                  setBGImage(val);
                  setSettings({ bgImage: val });
                }}
                map={bgImageMap}
                position='top'
              />
            </div>
            <div className='devp-content-row'>
              <div className='devp-content-title'>Background Size</div>
              <SSelect
                className='devp-content-ctrl'
                value={bgSize}
                onChange={(val) => {
                  setBGSize(val);
                  setSettings({ bgSize: val });
                }}
                map={bgSizeMap}
                position='top'
                disabled={bgImage === 'none'}
              />
            </div>
            <div className='devp-content-row'>
              <div className='devp-content-title'>Background Color</div>
              <SInput
                className='devp-content-ctrl'
                value={bgColor || ''}
                onChange={(val) => {
                  setBGColor(val);
                  setSettings({ bgColor: val });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DevPanel;
