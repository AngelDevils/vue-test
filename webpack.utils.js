const path = require('path');
/**
 * 
 */
class webpackUtils {
    constructor() {
        this.ENV = process.env.npm_lifecycle_event; //项目环境
    }

    /**
     * 根据项目名称获取项目文件目录映射
     * @param {项目名称} projectName
     */
    getProjectAlias() {
        return {
            '@assets': path.resolve(__dirname, 'src/assets'), //静态文件目录映射
            '@components': path.resolve(__dirname, 'src/components'), //项目公用组件目录映射
            '@pages': path.resolve(__dirname, 'src/pages'), //项目页面组件目录映射
            '@utils': path.resolve(__dirname, 'src/utils'), //项目工具目录映射
            '@router': path.resolve(__dirname, 'src/router'), //项目路由目录映射
            '@requests': path.resolve(__dirname, 'src/requests'), //项目请求目录映射
            '@store': path.resolve(__dirname, 'src/store'), //项目vuex目录映射
            'vue': 'vue/dist/vue.js'
        };
    }

    /**
    * 获取是否需要压缩配置,mode环境
    */
    getDistFlag() {
        return this.ENV == 'build';
    }
}

module.exports = new webpackUtils();