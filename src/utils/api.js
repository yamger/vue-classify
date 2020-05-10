import axios from 'axios';
import store from '../store';
import { get }from './storage';

axios.defaults.baseURL = `/api`;
axios.interceptors.request.use(config => {
    if (config.headers['Authorization'] === undefined) {
        config.headers.Authorization = store.getters.getToken
        if (config.headers.Authorization === "") {
            config.headers.Authorization = get("token");
        }
    }
    return config;
}, error => {
    console.log(error);
})
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params, headers) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers
    })
};
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params
    })
};
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        params
    })
};
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params
    })
};
