import axios from "../http/http.js";

export function databaseshow() {
    return axios({
        url: '/emailAdmin/findAll',

    })
}

// 分页
export function databaseshowpage(n, s) {
    return axios({
        url: '/emailAdmin/findPage/' + n + '/' + s + '?email=',
        // url: '/emailAdmin/findPage/' + n + '/' + s + '?email=',
        method: "POST",
    })
}
// 删除单条
export function delemailbyid(id) {
    return axios({
        url: '/emailAdmin/delete/' + id,
        method: "DELETE",
    })
}
// 批量删除
export function delemailsel(ids) {
    return axios({
        url: '/emailAdmin/batchRemove/',
        method: "DELETE",
        data:ids,
    })
}