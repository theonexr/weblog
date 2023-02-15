import axios from 'axios'
import { setToken, getToken,removeToken} from "@/util/token";
//进度条
import nprogress from 'nprogress';
//因为进度条样式咱们没有引入
// // 当前模块中引入store
// import store from '@/store'
import "nprogress/nprogress.css"
export const baseURL = 'http://localhost:8082'

const requests = axios.create({
    // 配置对象
    baseURL: baseURL,
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (getToken()) {
        config.headers['Authorization'] = getToken() 
      }
    //检测到程序发请求，请求拦截器可以检测到，进度条开始动
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // Do something before request is sent
 //简化服务器返回的数据格式
    //服务器数据返回进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(error)
});

// 对外暴露
export default requests