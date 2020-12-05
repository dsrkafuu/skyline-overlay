import OverlayAPI from 'ffxiv-overlay-api';
import isDev from '../plugins/isDev.js';

/**
 * get overlay api
 * @param {Function} updateCombatData callback function to update data
 */
function useOverlayAPI(updateCombatData) {
  let overlay = null;
  if (window.overlay) {
    overlay = window.overlay;
  } else {
    overlay = new OverlayAPI({
      extendData: true,
      silentMode: !isDev(),
    });
    overlay.addListener('CombatData', (data) => {
      updateCombatData(data);
    });
    window.overlay = overlay;
    /* DEV - START */
    isDev() &&
      fetch('https://raw.githubusercontent.com/amzrk2/ffxiv-overlay-api/master/test/fake_cn.json')
        .then((response) => {
          return response.json();
        })
        .then((fakeData) => {
          overlay.simulateData(fakeData);
          setTimeout(() => {
            // Disable simulation
            overlay.simulateData();
          }, 10000);
        });
    /* DEV - END */
  }
  return { overlay };
}

export default useOverlayAPI;
