import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// PrimeVue
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import PrimeVue from "primevue/config"
import PrimeButton from "primevue/button"
import InputText from "primevue/inputtext"
app.use(PrimeVue)
app.component("PrimeButton", PrimeButton)
app.component("InputText", InputText)

app.mount('#app')
