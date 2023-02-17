import React from 'react'
import { Badge } from 'antd-mobile'
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import './Show.less'

export default function Show(props) {
  return (
    <div className='show-box'>
      <div className="content">

      </div>

      {/* 底部栏，吸底效果 */}
      <div className="tab-bar">
        <div className='back'><LeftOutline /></div>
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
