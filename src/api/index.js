// api请求
import http from './http'

// 获取轮播图信息
const queryBanner = () => {
    return http.get('/api/getBanner');
}

//分页查询小说
const queryNovelPage = (pageNum, pageSize, categoryId) => {
    // ?pageNum=0&pageSize=1&categoryId=-1
    return http.get('/api/getNovelByCategory', {
        params: {
            pageNum,
            pageSize,
            categoryId
        }
    })
}
//获取所有分类
const getAllCategory = () => {
    return http.get('/api/getAllCategory');
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
const getNovelDetail = (id) => {
    return http.get('/api/getNovelDetail', {
        params: {
            id
        }
    })
}

// 分页获取当前小说的章节列表
const getChapterPageListById = (pageNum, pageSize, novelId) => {
    return http.get('/api/getChapterPageListById', {
        params: {
            pageNum,
            pageSize,
            novelId
        }
    })
}

//获取当前小说的具体信息
const getShowInfo = (novelId, chapterId) => {
    return http.get('/api/getShowInfo', {
        params: {
            novelId,
            chapterId
        }
    })
}

/**
 * chatGpt 模块
 */
// 获取回答
const getAnSwer = (msg) => {
    return http.get('/api/getAnswer', {
        params: {
            msg
        }
    })
}
//获取图片
const getImage = (input) => {
    return http.get('/api/getImage', {
        params: {
            input
        }
    })
}

/**
 * 验证码模块
 */
//邮箱验证码
const sendEmail = (email) => {
    return http.get('/api/email/sendEmail', {
        params: {
            email
        }
    })
}

/**
 * 用户相关
 */
//登录
const login = (userName, password) => {
    return http.post('/api/front/login', {
        userName,
        password
    })
}

//注册
const register = (email, userName, password, code) => {
    return http.post('/api/user/register', {
        email,
        userName,
        password,
        code
    })
}
//获取用户信息
const getUserInfo = () => {
    return http.get('/api/user/getUserInfo')
}

//收藏/取消收藏 小说
const collectNovel = (novelId) => {
    return http.get('/api/collectNovel', {
        params: {
            novelId
        }
    })
}
//收藏的小说列表
const collectNovelList = () => {
    return http.get('/api/collectList')
}
//上传头像 「要求FormData格式」
const upload = (file) => {
    return http.put('/api/upload', {
        file
    })
}

// 修改个人信息
const userUpdate = (username, pic) => {
    return http.post('/api/user_update', {
        username,
        pic
    });
};

//用户提出建议
const writeAdvice = (input) => {
    return http.get('/api/writeAdvice', {
        params: {
            input
        }
    })
}
// 建议列表
const getAdviceList = () => {
    return http.get('/api/adviceList')
}

// 暴露API
const api = {
    queryBanner,
    queryChapterById,
    queryNovelPage,
    getNovelDetail,
    getAllCategory,
    getChapterPageListById,
    getShowInfo,
    getAnSwer,
    getImage,
    sendEmail,
    login,
    register,
    getUserInfo,
    collectNovel,
    collectNovelList,
    upload,
    writeAdvice,
    getAdviceList,

}

export default api;
