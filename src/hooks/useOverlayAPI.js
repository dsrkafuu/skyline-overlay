import OverlayAPI from 'ffxiv-overlay-api';

/**
 * get overlay api
 * @param {Function} updateCombatData callback function to update data
 */
function useOverlayAPI(updateCombatData) {
  const overlay = new OverlayAPI({
    extendData: true,
    silentMode: process?.env?.NODE_ENV === 'production',
  });
  overlay.addListener('CombatData', (data) => {
    updateCombatData(data);
  });
  /* DEV - START */
  process?.env?.NODE_ENV === 'development' &&
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
  return { overlay };
}

export default useOverlayAPI;
