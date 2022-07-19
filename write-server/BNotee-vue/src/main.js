// JavaScript Import
import { createApp } from "vue"
import App from "./App.vue"
// Highlight.js Import
import hljsVuePlugin from "@highlightjs/vue-plugin"

// CSS
import "highlight.js/styles/github.css"
import "./assets/css/public.css"
import "./assets/css/article.css"
import "./assets/css/textfieldGroup.css"
import "./assets/css/inputGroup.css"
import "./assets/css/materialIcons.css"
import "./assets/css/shadows.css"
import "./assets/css/button.css"
import "./assets/css/checkbox.css"
import "./assets/css/anchor.css"
import "./registerServiceWorker"

const app = createApp(App)
app.use(hljsVuePlugin)
app.config.unwrapInjectedRef = true
app.mount("#app")
