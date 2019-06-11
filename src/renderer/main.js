import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

require('./styles/app.scss');

if (!process.env.IS_WEB) 
    Vue.use(require('vue-electron'));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

const req = require.context('./components/', true, /\.(js|vue)$/i); 
req.keys().map(key => {
    const name = req(key).default.name;
    return Vue.component(name, req(key).default);
});

/* eslint-disable no-new */
window.vm = new Vue({
    components: { App },
    router,
    store,
    template: '<App/>',
    mounted() {
        this.$store.dispatch('Servers/startUpdateLoop');
    }
}).$mount('#app');
