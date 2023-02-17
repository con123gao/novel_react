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

// 暴露API
const api = {
    queryBanner,
    queryChapterById,
    queryNovelPage,
    getNovelDetail,
    getChapterPageListById,

}

export default api;
