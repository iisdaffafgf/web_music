import request from "./request.js"

// 获取热榜歌单 
export function getToplist() {
    return request({
        url: '/toplist'
    })
}
// 处理获取到的热榜歌单数据(单项数据,要全部数据就手动push进数组)
export class Toplist {
    constructor(data, index) {
        this.name = data[index].name;
        this.coverImgUrl = data[index].coverImgUrl;
        this.updateFrequency = data[index].updateFrequency;
        this.description = data[index].description;
        this.id = data[index].id
    }
}

// 根据Toplist中的id获取歌单内包含的歌曲数据
export function getPlaylist(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}
// 处理获取到的歌曲数据
export class SongInfo {
    constructor(data, index) {
        this.name = data[index].name;
        this.id = data[index].id;
        this.artistName = data[index].ar[0].name;
        this.artistId = data[index].ar[0].id
        // this.ar = data[index].ar
    }
}

// 根据SongInfo中的id,请求具体的歌曲url
export function getSongUrl(id) {
    request({
        url: '/song/url',
        params: {
            id
        }
    })
}