import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios";
import dataV from '@jiaminghi/data-view'
import './registerServiceWorker'

axios.defaults.baseURL = 'http://localhost:8181/user'

const app = createApp(App)
installElementPlus(app)

app
    .use(store)
    .use(router)
    .use(dataV)
    .mount('#app')