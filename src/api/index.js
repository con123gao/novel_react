// api请求
import http from './http'

// 获取轮播图信息
const queryBanner = () => {
    return http.get('/api/getBanner');
}

//分页查询小说
const queryNovelPage = (pageNum,pageSize,categoryId) => {
    // ?pageNum=0&pageSize=1&categoryId=-1
    return http.get('/api/getNovelByCategory',{
        params: {
            pageNum,
            pageSize,
            categoryId
        }
    })
}

//获取小说对应的章节
const queryChapterById = (id) => {
    return http.get('/api/getChapterList', {
        params: {
            id
        }
    })
}

// 根据id获取 当前小说的详细信息
const getNovelDetail = (id)=>{
    return http.get('/api/getNovelDetail',{
        params: {
            id
        }
    })
}

// 分页获取当前小说的章节列表
const getChapterPageListById = (pageNum,pageSize,novelId)=>{
    return http.get('/api/getChapterPageListById',{
        params: {
            pageNum,
            pageSize,
            novelId
        }
    })
}

/**
 * chatGpt 模块
 */
// 获取回答
const getAnSwer = (msg)=>{
    return http.get('/api/getAnswer',{
        params: {
            msg
        }
    })
}
//获取图片
const getImage = (input)=>{
    return http.get('/api/getImage',{
        params: {
            input
        }
    })
}

/**
 * 验证码模块
 */
//邮箱验证码
const sendEmail = (email)=>{
    return http.get('/api/email/sendEmail',{
        params: {
            email
        }
    })
}

/**
 * 用户相关
 */
//登录
const login = (userName,password)=>{
        return http.post('/api/front/login',{
        userName,
        password
    })
}

//注册
const register = ()=>{
    return http.post('/api/user/register',{
        email,
        userName,
        password,
        code
    })
}
//获取用户信息
const getUserInfo = (email)=>{
    return http.get('/api/user/getUserInfo')
}




// 暴露API
const api = {
    queryBanner,
    queryChapterById,
    queryNovelPage,
    getNovelDetail,
    getChapterPageListById,
    getAnSwer,
    getImage,
    sendEmail,
    login,
    register,
    getUserInfo,
    
}

export default api;
