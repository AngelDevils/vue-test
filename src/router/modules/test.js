const test = [
    {
        path: '/test',
        component: () => import(/* webpackChunkName: "test" */ '@pages/test/Test.vue'),
        meta: {
            title: '测试',
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "test" */ '@pages/about/About.vue'),
        meta: {
            title: 'about',
            keepAlive: true // 需要被缓存
        }
    }
];
export default test;