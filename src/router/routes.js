import { lazy } from 'react'
import Home from '../views/Home'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        // 表示下面必须要传入id
        path: '/chapter/:id',
        name: 'chapter',
        // 懒加载
        component: lazy(()=>import('../views/Chapter')),
        meta: {
            title: '章节'
        }
    },
    {
        path: '/show',
        name: 'show',
        component: lazy(()=>import('../views/Show')),
        meta: {
            title: '阅读'
        }
    },
    {
        path: '/personal',
        name: 'personal',
        component: lazy(()=>import('../views/Personal')),
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/store',
        name: 'store',
        component: lazy(()=>import('../views/Store')),
        meta: {
            title: '我的收藏'
        }
    },
    {
        path: '/update',
        name: 'update',
        component: lazy(()=>import('../views/Update')),
        meta: {
            title: '修改个人信息'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: lazy(()=>import('../views/Login')),
        meta: {
            title: '登录/注册'
        }
    },
    {
        path: '*',
        name: '404',
        component: lazy(()=>import('../views/Page404')),
        meta: {
            title: '访问资源不存在'
        }
    }
];

export default routes;
