import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './barephoenix.scss';
import { ThemePartial } from '../utils/constants';

const themes: {[k: string]: ThemePartial} = {
  default: { text: 'Skyline Overlay' },
  horiz: { text: 'HORIZOVERLAY' },
  ikegami: { text: 'ikegami' },
  enix: { 
    text: 'Enix',
    options: {
      combatants: {
        combatant: {
          hideBottomOnHover: false,
          detail: {
            paddingTop: 0.8,
          }
        }
      }
    }
  },
};

export default themes;
