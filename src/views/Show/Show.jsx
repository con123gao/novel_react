import React from 'react'
import { Badge } from 'antd-mobile'
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import './Show.less'

export default function Show(props) {
  const { navigate } = props
  const { novelId, chapterId, chapterName } = props.params

  const base_pre = "http://localhost:8080/book/"
  return (
    <div className='show-box'>
      <h2>{chapterName}</h2>
      <iframe src={base_pre + novelId + '/' + chapterId + '.html'}  className='show-iframe'
        border="0" 
        // marginwidth="0" marginheight="0" 
      >
      </iframe>

      {/* 底部栏，吸底效果 */}
      <div className="tab-bar">
        <div className='back'
          onClick={() => {
            navigate(-1);
          }}
        ><LeftOutline /></div>
        <div className="icons">
          <Badge content="128"><MessageOutline /></Badge>
          <Badge content="29"><LikeOutline /></Badge>
          <span><StarOutline /></span>
          <span><MoreOutline /></span>
        </div>
      </div>

    </div>
  )
}
