import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { NavBar, TabBar } from 'antd-mobile'

import defaultImg from '../../assets/images/default.png';
import './HomeHead.less'

import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
/**
 * 首页的头部部分
 * @returns 
 */
export default function HomeHead(props) {
    let { today } = props;
    let time = useMemo(() => {
        let [, month, day] = ('' + today).match(/^\d{4}(\d{2})(\d{2})$/),
            area = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
        return {
            month: area[+month] + '月',
            day
        }
    }, [today])


    return <header className='home-head-box'>
        {/* 时间与标题 */}
        <div className='info'>
            <div className='time'>
                <span>{time.day}</span>
                <span>{time.month}</span>
            </div>
            <Link
                to={{ pathname: `/` }}
                className='header-route'
            >
                小说
            </Link>
            <Link
                to={{ pathname: `/chatgpt` }}
                className='header-route'
            >
                AI学习
            </Link>
            <Link
                to={{ pathname: `/store` }}
                className='header-route'
            >
                收藏夹
            </Link>
            <Link
                to={{ pathname: `/store` }}
                className='header-route'
            >
                留言
            </Link>
        </div>
        {/* 头像区域 */}
        <div className='picture'>
            <Link
                to={{ pathname: `/login` }}
            >
                {/* 打包后 静态资源img相对地址找不到，所以我们需要在css样式中使用相对地址 */}
                <img src={defaultImg} alt="" />
            </Link>
        </div>
    </header >
}
