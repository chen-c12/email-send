import axios from "../http/http.js";


export function addemailandsendcode(email,code) {
    return axios({
        url:'/'+email+'/'+code,
        method:'PUT',
    })
}
// 发送验证码给邮箱
export function sendcode(email) {
    return axios({
        url:'/code',
        method:'POST',
        params:{
            email:email
        }
    })
}