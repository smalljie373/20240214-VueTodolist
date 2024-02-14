import "./assets/index.css";

import { createApp } from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import Loading from 'vue3-loading-overlay';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router);
app.use(VueAxios,axios);
app.use(VueSweetalert2);
app.component('VueLoading', Loading);
app.provide('axios', app.config.globalProperties.axios);

app.mount('#app')
