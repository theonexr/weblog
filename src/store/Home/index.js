import { reqUserRegister, UserLogin, UserLoginOut, CurrentUserInfo, ArticleList, CommentList , CommentCreate, PublishArticle} from '@/api'
import { setToken, getToken, removeToken } from "@/util/token";

const state = {
    token: getToken(),
    userInfo: {}, //用户信息
    articleList: {}, //文章列表
    CommentList: {} //评论列表
}
const mutations = {
    USERLOGIN(state, token) {
        state.token = token
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = ''
        removeToken()
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    GETARTICLELIST(state, articleList) {
        state.articleList = articleList
    },
    GETCOMMITLIST(state, CommentList) {
        state.CommentList = CommentList
    }
}
const actions = {
    // 用户注册
    async UsersRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async UsersLogin({ commit }, data) {
        let result = await UserLogin(data)
        // console.log(result);
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit('USERLOGIN', result.data)
            setToken(result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录后获取用户信息
    async GetUserInfo({ commit }, data) {
        let result = await CurrentUserInfo(data)
        if (result.code == 200) {
            //用户已经登录成功且获取到token
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async UserLoginOut1({ commit }, data) {
        let result = await UserLoginOut(data)
        if (result.code == 200) {
            commit("CLEAR")
            if (getToken() == null) {
                location.reload()
            }
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 根据id读取文章
    async GetArticleList({ commit }, id) {
        let result = await ArticleList(id)
        if (result.code == 200) {
            commit("GETARTICLELIST", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 根据id获取评论列表
    async GetCommentList({ commit }, id) {
        let result = await CommentList(id)
        if (result.code == 200) {
            commit("GETCOMMITLIST", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 评论文章
    async GetCommentCreate({commit},data){
        let result = await CommentCreate(data)
        if(result.code==200){
            // location.reload()
        }

    },
    // 发布文章
    async PublishArticle1({commit},data){
        let result = await PublishArticle(data)
        if (result.code == 200) {
        }
    }
}
const getters = {
    body(state) {
        return state.articleList.body || {}
    },
    category(state){
        return state.articleList.category || {} 
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}