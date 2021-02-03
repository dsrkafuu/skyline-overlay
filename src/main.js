// css
import 'normalize.css';
import './scss/themes.scss';
import './scss/global.scss';
// deps
import { createApp } from 'vue';
import Skyline from './Skyline.vue';
// store
import store from './store/index.js';

createApp(Skyline).use(store).mount('#app');
