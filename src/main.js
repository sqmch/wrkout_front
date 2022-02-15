// FILE: main.js

import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons-sharp'
import { createPinia } from 'pinia'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import router from './router'
import axios from "axios"

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		//alert("Session expired, please login again.");
		router.push("/login");
		return Promise.reject(error);
	}
);

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {Notify}, // import Quasar plugins and add here
  iconSet: quasarIconSet,
}).use(router).use(createPinia())

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
