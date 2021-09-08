import request from "./request.js"

// 请求网友精选碟 (得到的结果是多个歌单的集合)
export function getplayLists(limit = 30) {
    return request({
        url: '/top/playlist',
        params: {
            limit
        }
    })
}
{ getplayLists, PlaylistsItem }
// 处理请求得到的数据 (多个歌单集合中的单个歌单信息)
export class PlaylistsItem {
    constructor(playlists, index) {
        this.id = playlists[index].id;
        this.name = playlists[index].name;
        this.coverImgUrl = playlists[index].coverImgUrl;
        this.description = playlists[index].description;
        this.tags = playlists[index].tags;
        this.playCount = playlists[index].playCount
    }
}