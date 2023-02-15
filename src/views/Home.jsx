
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper } from 'antd-mobile'

import HomeHead from '../components/HomeHead'
import _ from '../assets/utils'

import './Home.less'

// 首页
export default function Home() {
  // 创建所需状态
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"));

  return (
    <div className='home-box'>
      {/* 头部 */}
      <HomeHead today={today} />
      {/* 轮播图 */}
      <div className='swiper-box'>
        <Swiper>
          <Swiper.Item>
            <Link to="/chapter/xxx">
              <img src="https://www.xbiquge.so/files/article/image/4/4772/4772s.jpg" alt="" />
              <div className="desc">
                <h3 className='title'>测试，这是一个标题</h3>
                <p className='author'>作者：世纪糕</p>
              </div>
            </Link>
          </Swiper.Item>
        </Swiper>
      </div>
    </div>
  )
}
