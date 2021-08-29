import axios from "axios";
function request(config) {
    const instance = axios.create({
        baseURL: 'https://autumnfish.cn',
        timeout: 5000,
        xhrFields: {
            withCredentials: true
        }
    })
    return instance(config)
}
export default request