import axios from "axios";
function request(config) {
    const instance = axios.create({
        // baseURL: 'https://autumnfish.cn',
        baseURL: 'http://localhost:3000',
        // baseURL: 'http://120.79.204.227:3000',
        timeout: 5000,
        // withCredentials: true,
        headers: {
            "Content-Type": "application/json; charset=UTF-8;"
        },
        // transformRequest: (data) => {
        //     if (!data) return data;
        //     let result = ``;
        //     for (let attr in data) {
        //         if (!data.hasOwnProperty(attr)) break;
        //         result += `&${attr}=${data[attr]}`;
        //     }
        //     return result.substring(1)
        // }

    })
    return instance(config)
}
export default request