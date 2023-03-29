import axios from 'axios'

// 
let http = axios.create({
    baseURL: ' http://124.220.198.6:8888',
    method: 'GET'
})

// 请求拦截器 
http.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token')

    console.log('==>',config.headers);
    // console.log('token');
    // console.log('每次请求优先执行use',config);
    config.headers = token
    // config.headers.ContentType = "application/x-www-form-urlencoded"

    console.log('请求拦截');
    return config
})

// // 响应拦截器 
http.interceptors.response.use(function (data) {
    console.log('响应拦截器', data);
    // let token = sessionStorage.getItem('token')
    // config.headers.Authorization = token
    return data.data
})




export default http