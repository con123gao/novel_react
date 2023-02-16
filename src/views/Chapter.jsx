import React, { useState, useEffect, useRef } from 'react'

import { Swiper, Divider, DotLoading } from 'antd-mobile'

import './Chapter.less'
import _ from '../assets/utils'
import api from '../api'
// 章节页面
export default function Chapter(props) {

  // 监听 加载更多
  const loadMore = useRef();

  const id = props.params.id
  const [novelInfo, setNovelInfo] = useState([])
  // 当前页码
  const [pageNum, setPageNum] = useState(1)
  // 当前 每页大小
  const [pageSize, setPageSize] = useState(3)
  // 当前 最大大小
  const [chapterCount, setChapterCount] = useState(0)
  // 章节列表
  const [chapterList, setChapterList] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        let res = await api.getNovelDetail(id);
        setNovelInfo(res.data)
        let chapterData = await api.queryChapterById(id);
        console.log(chapterData);
        setChapterList([...chapterData.data])
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
        if (chapterList.length < chapterCount)
          // 触底，加载更多数据
          try {
            let res = await api.queryNovelPage(pageNum + 1, pageSize, categoryId)
            setPageNum(pageNum + 1)
            chapterList.push(...res.data.rows)
            setChapterList([...chapterList])
          } catch (_) {

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
      {/* 具体信息 */}
      {console.log(novelInfo)}
      {/* 无限滚动 */}
      {
        chapterList.length === 0 ?
          //  没有数据展示骨架屏 
          <SkeletonAgain /> :
          <>
            {/*  封装的每一条章节的组件 */}
            {
              chapterList.map(item => {
                return <div className='chapter-box' key={item.chapterId}>
                  <div className="list" >
                    {item.chapterName}
                  </div>
                </div>
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
