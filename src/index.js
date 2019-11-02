import Vue from 'vue';
import index from './router';
import Vuex from 'vuex';
import store from '@store/index';
import httpServer from '@utils/http.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Comp from '@pages/test/Comp.vue';
import Third from '@pages/test/Third.vue';
Vue.use(Comp); // 自定义全局组件的时候需要Vue.use();
Vue.component('Comp', Comp); //初始化组件
Vue.use(Third); // 自定义全局组件的时候需要Vue.use();
Vue.component('Third', Third); //初始化组件

Vue.use(Vuex);
Vue.use(ElementUI);

Vue.prototype.$httpServer = httpServer;

new Vue({
    el: '#app',
    router: index,
    store,
    components: {
        // Comp
    },
    data() {
        return {};
    },
    created() {
    },
    computed: {
    },
    methods: {
    },
});

if (module.hot) {
    module.hot.accept();
}