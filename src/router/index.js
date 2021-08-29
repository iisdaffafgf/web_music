import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决重复点击路由报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const Discover = () => import('@/views/discover/Discover.vue')
const Mine = () => import('@/views/mine/Mine.vue')
const Friend = () => import('@/views/friend/Friend.vue')
const Shop = () => import('@/views/shop/Shop.vue')
const Artist = () => import('@/views/artist/Artist.vue')
const Download = () => import('@/views/download/Download.vue')
const routes = [
  {
    path: '',
    redirect: '/discover'
  },
  {
    path: '/discover',
    component: Discover,
    children: [
      {
        path: '',
        redirect: 'recommend'
      }, {
        path: 'recommend',
        component: () => import("@/views/discover/discoverComps/Recommend.vue")
      }, {
        path: 'ranklist',
        component: () => import("@/views/discover/discoverComps/Ranklist.vue")
      }, {
        path: 'playlist',
        component: () => import("@/views/discover/discoverComps/Playlist.vue")
      }, {
        path: 'liveradio',
        component: () => import("@/views/discover/discoverComps/Liveradio.vue")
      }, {
        path: 'singer',
        component: () => import("@/views/discover/discoverComps/Singer.vue")
      }, {
        path: 'newdisc',
        component: () => import("@/views/discover/discoverComps/Newdisc.vue")
      }

    ]
  }, {
    path: '/mine',
    component: Mine
  }, {
    path: '/friend',
    component: Friend
  }, {
    path: '/shop',
    component: Shop
  }, {
    path: '/artist',
    component: Artist
  }, {
    path: '/download',
    component: Download
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
