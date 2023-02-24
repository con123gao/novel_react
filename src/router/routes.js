import {
    lazy
} from 'react'
import Home from '../views/Home/Home'
import { withKeepAlive } from 'keepalive-react-component'

const routes = [
    {
        // 表示下面必须要传入id
        path: '/chapter/:id',
        name: 'chapter',
        // 懒加载
        //缓存
        component: withKeepAlive(
            lazy(() => import('../views/Chapter/Chapter')),
            {
                cacheId: 'chapter',
                scroll: true
            }),
        meta: {
            title: '章节'
        }
    },
    {
        path: '/show/:novelId/:chapterId/:chapterCount',
        name: 'show',
        component: lazy(() => import('../views/Show/Show')),
        meta: {
            title: '阅读'
        }
    },
    {
        path: '/advice',
        name: 'advice',
        component: lazy(() => import('../views/Advise/Advice')),
        meta: {
            title: '用户建议'
        }
    },
    {
        path: '/personal',
        name: 'personal',
        component: lazy(() => import('../views/Personal/Personal')),
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/store',
        name: 'store',
        component: lazy(() => import('../views/Store/Store')),
        meta: {
            title: '我的收藏'
        }
    },
    {
        path: '/update',
        name: 'update',
        component: lazy(() => import('../views/Update/Update')),
        meta: {
            title: '修改个人信息'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: lazy(() => import('../views/Login/Login')),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: lazy(() => import('../views/Register/Register')),
        meta: {
            title: '注册'
        }
    },
    {
        path: 'chatgpt',
        name: 'chatgpt',
        component: lazy(() => import('../views/ChatGpt/ChatGpt')),
        meta: {
            title: 'chatGpt模块'
        }
    },
    {
        path: '/',
        name: 'home',
        //缓存
        component: withKeepAlive(Home, {
            cacheId: 'home',
            scroll: true
        }),
        meta: {
            title: '首页'
        }
    },
    {
        path: '*',
        name: '404',
        component: lazy(() => import('../views/Page404/Page404')),
        meta: {
            title: '访问资源不存在'
        }
    },
];

export default routes;