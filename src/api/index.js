// api请求
import http from './http'

// 获取轮播图信息
const queryBanner = () => {
    return http.get('/getBanner');
}

//获取小说对应的章节
const queryChapterById = (id) => {
    return http.get('/getChapterList', {
        params: {
            id
        }
    })
}


// 暴露API
const api = {
    queryBanner,
    queryChapterById
}

export default api;
