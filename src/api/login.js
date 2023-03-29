import axios from "../http/http.js";

export function loginroot(rootform){
    return axios({
        url:'/emailAdmin/login',
        method:'POST',
        params:{
            adminUser:rootform.username,
            password:rootform.password,
        }
    })
}