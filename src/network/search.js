import request from './request.js'
// 请求搜索内容
export function searchRes(keywords) {
    return request({
        url: '/cloudsearch',
        params: {
            keywords
        }
    })
}
// 请求检测歌曲是否可用
export function availableSong(id) {
    return request({
        url: '/check/music',
        params: {
            id
        }
    })
}