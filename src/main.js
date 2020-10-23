import 'normalize.css';
import './scss/global.scss';

import { createApp } from 'vue';
import Skyline from './Skyline.vue';

import store from './store';

createApp(Skyline).use(store).mount('#app');
