import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest, postKeyValueRequest} from "./utils/api";
import element from './components/element'
import {Notification} from 'element-ui';
import {get, set, remove, clean,} from './utils/storage';
import Axios from 'axios';
import './assets/css/global.css';
Vue.config.productionTip = false;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.$notify = Notification;
Vue.prototype.storageSet = set;
Vue.prototype.storageGet = get;
Vue.prototype.storageRemove = remove;
Vue.prototype.storageClean = clean;
Vue.prototype.axios = Axios
Vue.use(element);
router.beforeEach((to, from, next) => {
    // console.log(from.fullPath, " ===> ", to.fullPath);
    if(to.fullPath==='/'){
        next();
    }
    else if (get("token") == null && from.fullPath!=='/') {
        return next({
            name: 'login'
        })

    }
    next();

});
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
