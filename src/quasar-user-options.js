
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import {Loading, Notify} from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    'css':[
      'app.scss',
      'tailwind.css'
    ]
  },
  plugins: {
    Notify,
    Loading
  }
}