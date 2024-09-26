import './assets/main.css'
import { Quasar } from 'quasar'
// Import icon libraries


// Import Quasar css
import 'quasar/src/css/index.sass'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
app.use(createPinia())

app.mount('#app')
