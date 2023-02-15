import requests from "./axios";

// 注册
export const reqUserRegister = (data)=>requests({url:'/register',data,method:'POST'})
// 登录
export const UserLogin = (data) =>requests({url:'/login',data,method:'POST'})
// 登录后获取用用户信息
export const CurrentUserInfo = (data) =>requests({url:'/users/currentUser',data,method:'get'})
// 退出登录
export const UserLoginOut = (data) =>requests({url:'/logout',data,method:'get'})
// 首页列表
export const HomeList = (data) =>requests({url:'/articles',data,method:'POST'})
// 最热标签
export const BestHot = () =>requests({url:'tags/hot',method:'get'})
// 最热文章
export const HotArticle = () =>requests({url:'/articles/hot',method:'POST'})
// 最新文章
export const NewArticle = () =>requests({url:'/articles/new',method:'POST'})
// 文章归档
export const ListArchives = () =>requests({url:'/articles/listArchives',method:'POST'})
// 文章详情
export const ArticleList = (id) =>requests({url:`/articles/view/${id}`,method:'POST'})
// 评论列表
export const CommentList = (id) =>requests({url:`/comments/article/${id}`,method:'get'})
// 评论功能
export const CommentCreate = (data) =>requests({url:'/comments/create/change',data,method:'POST'})
// 获取所有文章类别
export const AllCategorys = () =>requests({url:'/categorys',method:'get'})
// 获取所有标签
export const AllTags = () =>requests({url:'/tags',method:'get'})
// 发布文章
export const PublishArticle = (data) =>requests({url:'/articles/publish',data,method:'POST'})
// 上传图片
export const UploadPhotos = (data) =>requests({url:'/upload',data,method:'POST'})
// 文章分类
export const AllDetail = () =>requests({url:'/categorys/detail',method:'get'})
// 标签
export const TabTags = () =>requests({url:'/tags/detail',method:'get'})
// 文章分类列表头部
export const CategorysDetail = (data) =>requests({url:`/categorys/detail/${data}`,method:'get'})
// 标签文章列表
export const TagList = (data) =>requests({url:`/tags/detail/${data}`,method:'get'})
// 归档文章列表
export const ArchivesList = (data) =>requests({url:'/articles',data,method:'POST'})