import {HomeList,BestHot,HotArticle,NewArticle,ListArchives} from '@/api'


const state = {
    HomeList:{},
    SpanList:{},
    HotArticleList:{},
    NewArticleList:{},
    ListArchivesList:{}
}
const mutations = {
    GETHOMELIST(state,HomeList){
        state.HomeList = HomeList
    },
    GETHOTSPAN(state,SpanList){
        state.SpanList = SpanList
    },
    GETHOTARTICLE(state,HotArticleList){
        state.HotArticleList = HotArticleList
    },
    GETNEWARTICLE(state,NewArticleList){
        state.NewArticleList = NewArticleList
    },
    GETLISTARTCHIVES(state,ListArchivesList){
        state.ListArchivesList = ListArchivesList

    }
}
const actions = {
    // 主页列表
   async GetHomeList({commit},data){
    let result = await HomeList(data)
    if(result.code==200){
        commit('GETHOMELIST',result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    },
    // 最热标签
    async GetHotSpan({commit}){
        let result = await BestHot()
        // console.log(result);
        if(result.code==200){
            commit('GETHOTSPAN',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 最热文章
    async GetHotArticle({commit}){
        let result = await HotArticle()
        if(result.code==200){
            commit('GETHOTARTICLE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 最新文章
    async GetNewArticle({commit}){
        let result = await NewArticle()
        if(result.code==200){
            commit('GETNEWARTICLE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 文章归档
    async GetListArtchives({commit}){
        let result = await ListArchives()
        if(result.code==200){
            commit('GETLISTARTCHIVES',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
}
export default{
    state,
    mutations,
    actions,
    getters
}