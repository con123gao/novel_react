
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, Divider, DotLoading, SearchBar,PickerView } from 'antd-mobile'

import HomeHead from '../../components/HomeHead/HomeHead'
import NovelsItem from '../../components/NovelsItem/NovelsItem'
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain'
import _ from '../../assets/utils'
import api from '../../api'

import './Home.less'
import { SoundMuteFill } from 'antd-mobile-icons'

// 首页
export default function Home() {

  // 监听 加载更多
  const loadMore = useRef();

  // 创建所需状态
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"))
  // 当前分类 
  const [categoryId, setCategoryId] = useState("-1")
  // 当前页码
  const [pageNum, setPageNum] = useState(1)
  // 当前 每页大小
  const [pageSize, setPageSize] = useState(3)
  // 当前大小
  const [novelCount, setNovelCount] = useState(0)

  //服务器拿到 广告列表
  const [bannerData, setBannerData] = useState([])
  // 小说列表，分页
  const [novelsList, setNovelsList] = useState([])

  const testData =  [
    [
      { label: '周一' },
      { label: '周二' },
      { label: '周三'},
      { label: '周四'},
      { label: '周五' },
    ],
    // [
    //   { label: '上午', value: 'am' },
    //   { label: '下午', value: 'pm' },
    // ],
  ]

  // 第一次渲染完毕，向服务器发送数据请求
  useEffect(() => {
    (async () => {
      try {
        let bannerList = await api.queryBanner();
        setBannerData(bannerList.data);
        let NovelList = await api.queryNovelPage(pageNum, pageSize, categoryId);
        let data = NovelList.data.rows
        setNovelCount(NovelList.data.total)
        setNovelsList([...data]);
      } catch (_) {
      }
    })();
  }, [])


  // 第一次渲染完毕，设置监听器，实现数据加载
  useEffect(() => {
    //设置监听器
    let ob = new IntersectionObserver(async changes => {
      // isIntersecting为true，出现在视口中
      let { isIntersecting } = changes[0];
      if (isIntersecting) {
        if (novelsList.length < novelCount) {
          // 触底，加载更多数据
          try {
            setPageNum(pageNum + 1)
            let res = await api.queryNovelPage(pageNum + 1, pageSize, categoryId)
            // console.log(novelsList);
            novelsList.push(...res.data.rows)
            setNovelsList([...novelsList])
          } catch (_) {

          }
        } else {
          loadMore.current.innerText = '到底了'
        }
      }
    });
    let loadMoreCache = loadMore.current
    ob.observe(loadMore.current)

    // 会在组件释放的时候执行
    return () => {
      // 手动移除 监听器
      ob.unobserve(loadMoreCache)
      ob = null
    }
  }, [novelsList, novelCount])




  return (
    <div className='home-box'>
      <i className="home-bg" />
      {/* 头部 */}
      <HomeHead today={today} />
      {/* 搜索框 */}
      <div className="search-box">
        <SearchBar
          placeholder='请输入内容'
          showCancelButton
          style={{
            '--border-radius': '100px',
            '--background': '#e2e5eb',
            '--height': '34px',
            '--padding-left': '12px',
          }}
        />
      </div>
      {/* 轮播图 */}
      <div className='swiper-box'>
        {bannerData.length > 0 ?
          <Swiper autoplay={true} loop={true}>
            {
              bannerData.map((item, index) => {
                const { id, author, thumbnail, title, summary } = item
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
      

      {/* 小说列表 */}
      {/* 分割线 */}
      <Divider contentPosition='left'> xxx小说网</Divider>
      {/* 分类 */}
      {/* <PickerView columns={testData} /> */}
      {
        novelsList.length === 0 ?
          //  没有数据展示骨架屏 
          <SkeletonAgain /> :
          <>
            {/*  封装的每一条小说的组件 */}
            {
              novelsList.map(item => {
                return <div className='novels-box' key={item.id}>
                  <div className="list" >
                    <NovelsItem info={item}></NovelsItem>
                  </div>
                </div>
              })
            }
          </>
      }
      {/* 加载更多 */}
      <div className='loadmore-box' ref={loadMore} style={{
        display: novelsList.length === 0 ? 'none' : 'block'
      }}>
        数据加载中
        <DotLoading />
      </div>
    </div >
  )
}
