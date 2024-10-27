import {Quasar} from 'quasar'
// Import icon libraries
// Import Quasar css
import 'quasar/src/css/index.sass'
import './assets/main.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'
import router from './router/index.js'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';


const app = createApp(App).use(Quasar, quasarUserOptions)

app.use(createPinia())
app.use(router)

axios.defaults.baseURL = 'https://на-связи.com/'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    error => {

        if (error.response?.status === 401 || error.response?.status === 419) {

            router.push({name: 'Login'})
        }
        return Promise.reject(error);
    });

app.mount('#app')
AOS.init({
    offset: 120,
    anchorPlacement: 'top-center'
});

