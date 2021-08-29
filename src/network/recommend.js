import request from './request'

// 轮播图请求
export function getBanners() {
    return request({
        url: '/banner',
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
// 热门歌单请求
export function getHotList() {
    return request({
        url: '/playlist/highquality/tags',
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
//歌单分类
export function getCaTlist(limit = 12) {
    return request({
        url: '/personalized',
        params: {
            limit
        }
    })
}

// 歌单详情请求
export function getPlayList(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}

// 获取歌曲url
export function getSongUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}

// 获取热门歌手
export function getArtist(limit) {
    return request({
        url: '/top/artists',
        params: {
            limit
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
// 根据id获取歌手详细信息
export function getArtistDetail(id) {
    return request({
        url: '/artist/desc',
        params: {
            id
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
// 根据歌手id获取歌手热门50首
export function getArtistHot(id) {
    return request({
        url: '/artist/top/song',
        params: {
            id
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
// 获取推荐Mv
export function getRecommendMv() {
    return request({
        url: 'personalized/mv',
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}
// 根据id获取mv播放地址
export function getMvUrl(id) {
    return request({
        url: '/mv/url',
        params: {
            id
        },
        // xhrFields: {
        //     withCredentials: true
        // }
    })
}