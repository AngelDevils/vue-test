import Vue from 'vue';
import VueRouter from 'vue-router';

//导入模块路由
import test from './modules/test';

let baseArr = [
    {
        path: '/',
        redirect: '/test'
    },
    // {
    //     path: '/errorPage',
    //     component: () => import('@cc/ErrorPage.vue'),
    //     meta: {
    //         title: '缺省页'
    //     }
    // },
];
//合并模块路由
let routerList = [
    ...test,
    ...baseArr,
];
Vue.use(VueRouter);
const index = new VueRouter({
    mode: 'history',
    base: '/',
    routes: routerList
});
//路由钩子
index.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default index;