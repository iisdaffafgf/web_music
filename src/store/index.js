import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isPlay: false
    },
    mutations: {
        playState(state, bool) {
            state.isPlay = bool
        },
        keyupSpace(state) {
            state.isPlay = !state.isPlay
        }
    }
})
export default store