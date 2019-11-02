/**
 * liuhong 
 */
import axios from 'axios';


/**
 * http
 */
class http {
    constructor() {
        axios.defaults.timeout = 5000;

        /**
         * 添加请求拦截器
         */
        axios.interceptors.request.use(
            config => {
                config.data = JSON.stringify(config.data);
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
                return config;
            },
            error => {
                return Promise.reject(err);
            }
        );

        /**
         * 响应拦截器
         */
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        console.log('错误请求');
                        break;
                    case 401:
                        console.log('未授权，请重新登录');
                        break;
                    case 403:
                        console.log('拒绝访问');
                        break;
                    case 404:
                        console.log('请求错误,未找到该资源');
                        break;
                    case 405:
                        console.log('请求方法未允许');
                        break;
                    case 408:
                        console.log('请求超时');
                        break;
                    case 500:
                        console.log('服务器端出错');
                        break;
                    case 501:
                        console.log('网络未实现');
                        break;
                    case 502:
                        console.log('网络错误');
                        break;
                    case 503:
                        console.log('服务不可用');
                        break;
                    case 504:
                        console.log('网络超时');
                        break;
                    case 505:
                        console.log('http版本不支持该请求');
                        break;
                    default:
                        console.log(`连接错误${err.response.status}`);
                }
            } else {
                console.log('连接到服务器失败');
            }
            return Promise.resolve(err.response);
        });
    }

    /**
     * 基于baseHttp封装的get请求
     * @param {请求地址} url
     * @param {请求入参} params
     */
    get(url, params, option = {}) {
        return this.baseHttp(url, 'get', params, option);
    }


    /**
     * 基于baseHttp封装的post请求
     * @param {请求地址} url
     * @param {请求入参} params
     */
    post(url, params, option = {}) {
        return this.baseHttp(url, 'post', params, option);
    }

    /**
     * 基于axios封装的异步请求
     * @param {请求地址} url
     * @param {请求类型} method
     * @param {请求参数} params
     */
    baseHttp(url, method, params, option) {
        return new Promise((resolve, reject) => {
            let config = {
                method: method,
                url: url,
                // headers: headers
            };
            if (config.method == 'get') {
                config.params = params;
            }
            if (config.method == 'post') {
                config.data = params;
            }
            axios(config).then((result) => {
                let resultData = result.data;
                if (resultData.code == 0) {
                    resolve(resultData.data || resultData.message);
                } else {
                    let message = resultData.message || '网络异常';
                    Vue.$message.error(message);
                    reject({
                        status: 500,
                        message: message
                    });
                }
            }).catch((error) => {
                let errorObj;
                if (error.response) {
                    //回应错误信息处理
                    errorObj = error.response.data;
                } else if (error.request) {
                    //请求前错误信息处理
                    errorObj = {
                        status: 500,
                        message: '网络异常'
                    };
                } else {
                    //其他错误
                    errorObj = error;
                }
                reject(errorObj);
            });
        });
    }
}

export default new http();