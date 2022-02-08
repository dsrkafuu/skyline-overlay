import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './barephoenix.scss';
import { ThemePartial } from '../utils/constants';

const themes: {[k: string]: ThemePartial} = {
  default: { 
    text: 'Skyline Overlay',
    key: 'default',
  },
  horiz: { 
    text: 'HORIZOVERLAY',
    key: 'horiz',
  },
  ikegami: { 
    text: 'ikegami',
    key: 'ikegami',
  },
  enix: { 
    text: 'Enix',
    key: 'enix',
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
