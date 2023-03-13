import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/all.scss'

import axios from 'axios'

import VueAxios from 'vue-axios'

import { date, currency } from './methods/filters'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
