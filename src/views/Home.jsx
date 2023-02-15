
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper } from 'antd-mobile'

import HomeHead from '../components/HomeHead'
import _ from '../assets/utils'
import api from '../api'

import './Home.less'

// 首页
export default function Home() {
  // 创建所需状态
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"))
  //服务器拿到 广告列表
  const [bannerData, setBannerData] = useState([])
  // 第一次渲染完毕，向服务器发送数据请求
  useEffect(() => {
    (async () => {
      try {
        let { data, code } = await api.queryBanner();
        setBannerData(data);
      } catch (_) {

      }
    })();
  }, [])

  return (
    <div className='home-box'>
      {/* 头部 */}
      <HomeHead today={today} />
      {/* 轮播图 */}
      <div className='swiper-box'>
        {bannerData.length > 0 ?
          <Swiper autoplay={true} loop={true}>
            {
              bannerData.map((item,index)=> {
                const {id,author,thumbnail,title,summary} = item
                return <Swiper.Item key={id}>
                  <Link to={{
                    pathname: `chapter/${id}`
                  }}>
                    <img src={thumbnail} alt="" />
                    <div className="desc">
                      <h3 className='title'>{title}</h3>
                      <p className='author'>作者/ {author}</p>
                    </div>
                  </Link>
                </Swiper.Item>
              })
            }
          </Swiper>
          : null}
      </div>
      {/*  */}
    </div>
  )
}
