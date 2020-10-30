// css
import 'normalize.css';
import './scss/global.scss';
// vue
import { createApp } from 'vue';
import Skyline from './Skyline.vue';
// store
import store from './store';

createApp(Skyline).use(store).mount('#app');
