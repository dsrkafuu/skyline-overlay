import './DevPanel.scss';
import { useCallback, useState } from 'react';
import { getLS, setLS } from './utils/storage';
import * as images from './assets/devbg';
import { SInput, SSelect, SSwitch } from './components';
import { cloneDeep } from './utils/lodash';
import overlay from './utils/overlay';

const bgImageMap = {
  combat: { text: 'Combat', data: { url: images.combat } },
  housing: { text: 'Housing', data: { url: images.housing } },
  night: { text: 'Night', data: { url: images.night } },
  treasure: { text: 'Treasure', data: { url: images.treasure } },
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockData: any = null;

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

  const [mocking, setMocking] = useState<number>(NaN);
  const handleMockingChange = useCallback(
    async (value: boolean) => {
      if (value) {
        let data = cloneDeep(mockData);
        if (!data) {
          const res = await fetch(
            'https://cdnjs.cloudflare.com/ajax/libs/ffxiv-overlay-api/4.4.0/fake_cn.json'
          );
          const json = await res.json();
          data = cloneDeep(json);
          mockData = cloneDeep(json);
        }
        let time = 1;
        const int = window.setInterval(() => {
          data.Encounter.duration = `00:${time < 10 ? '0' : ''}${time}`;
          data.Encounter.encdps = 0;
          Object.keys(data.Combatant).forEach((idx) => {
            const dps = (Math.random() * 20000).toFixed(0);
            data.Combatant[idx].encdps = dps;
            data.Encounter.encdps += Number(dps);
          });
          data.Encounter.encdps = `${data.Encounter.encdps}`;
          overlay.simulateData(data);
          time++;
        }, 1000);
        setMocking(int);
      } else {
        if (!Number.isNaN(mocking)) {
          window.clearInterval(mocking);
          setMocking(NaN);
        }
      }
    },
    [mocking]
  );

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
              <SSwitch
                value={!Number.isNaN(mocking)}
                onChange={handleMockingChange}
              />
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
