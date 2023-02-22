import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain'
import { Swiper, Divider, DotLoading, Ellipsis, Image } from 'antd-mobile'
import { TeamOutline } from 'antd-mobile-icons'

import './Chapter.less'
import _ from '../../assets/utils'
import api from '../../api'
// 章节页面
export default function Chapter(props) {

  // 监听 加载更多
  const loadMore = useRef();

  const id = props.params.id
  // 当前小说的详细信息
  const [novelInfo, setNovelInfo] = useState([])
  // 当前页码
  const [pageNum, setPageNum] = useState(1)
  // 当前 每页大小
  const [pageSize, setPageSize] = useState(10)
  // 当前 最大大小
  const [chapterCount, setChapterCount] = useState(0)
  // 章节列表
  const [chapterList, setChapterList] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        let res = await api.getNovelDetail(id);
        setNovelInfo(res.data)
        let chapterData = await api.getChapterPageListById(pageNum, pageSize, id)
        setChapterCount(chapterData.data.total)
        setChapterList([...chapterData.data.rows])
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
        if (chapterList.length < chapterCount) {
          // 触底，加载更多数据
          try {
            console.log(pageNum + 1)
            let res = await api.getChapterPageListById(pageNum + 1, pageSize, id)
            console.log(res)
            setPageNum(pageNum + 1)
            chapterList.push(...res.data.rows)
            setChapterList([...chapterList])
          } catch (_) {

          }
        } else {
          console.log(chapterCount)
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
  }, [chapterList, chapterCount])


  return (
    <div className='chapter-box'>
      {/* 头部 */}
      <section className="chapter-header"></section>
      {/* 具体信息 */}
      <section className='novel-info'>
        <div className='novel-item-box'>
          {/* 图片 */}
          <Image src={novelInfo.thumbnail} lazy />
          {/* 内容 */}
          <div className="content">
            <h4 className='title'>{novelInfo.title}</h4>
            <p className='author'> {novelInfo.author}</p>
            <p className='category'>{novelInfo.categoryName}</p>
            <div className='viewCount'>浏览量 <p>{novelInfo.viewCount}</p> 次</div>
            <p className='updateTime'>更新时间 {novelInfo.updateTime}</p>
          </div>
          <div className='summary'>
            <Ellipsis
              direction='end'
              content={novelInfo.summary}
              rows={2}
              expandText='展开'
              collapseText='收起'
            />
          </div>
        </div>

      </section>
      {/* 分割线 */}
      <Divider >共{chapterCount}章</Divider>
      {/* 无限滚动 */}
      {

        chapterList.length === 0 || !chapterList ?
          //  没有数据展示骨架屏 
          <SkeletonAgain /> :
          <>
            {/* 封装的每一条章节的组件 */}
            {
              chapterList.map(item => {
                return <Link
                  to={{ pathname: `/show/${item.novelId}/${item.chapterId}/${item.chapterName}` }}
                  state={chapterList}
                  key={item.chapterId}
                  className='chapter-list'
                >
                  <div className="chapter-list-box" >
                    {item.chapterName}
                  </div>
                </Link>
              })

            }
          </>
      }
      {/* 加载更多 */}
      <div className='loadmore-box' ref={loadMore} style={{
        display: chapterList.length === 0 ? 'none' : 'block'
      }}>
        数据加载中
        <DotLoading />
      </div>
    </div>
  )
}
