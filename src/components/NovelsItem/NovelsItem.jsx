import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { TeamOutline } from 'antd-mobile-icons'
import { Image, Ellipsis } from 'antd-mobile'
import './NovelsItem.less'
import { Lifecycle } from 'react-router'

/**
 * 一项项 小说，首页与收藏页面复用
 * @returns 
 */
export default function NovelsItem(props) {
  // 小说列表
  const { info } = props;
  if (!info) return null;

  const { id, author, summary, title, updateTime, thumbnail } = info
  // 历史记录中可能出现
  const { date, chapterName, chapterId, novelId } = info
  return (
    <div className='novel-item-box'>
      <Link to={{ pathname: chapterId ? `/show/${novelId}/${chapterId}/${false}` : `/chapter/${id}` }}>
        {/* 图片 */}
        <Image src={thumbnail} lazy />
        {/* 内容 */}
        <div className="content">
          <h4 className='title'>{title} </h4>
          {chapterName ?
            <>
              <div className='summary'><Ellipsis direction='end'
                content={chapterName} rows={2} />
              </div>
            </> :
            <div className='summary'><Ellipsis direction='end'
              content={summary} rows={2} />
            </div>
          }
          <p className='author'><TeamOutline /> {author}</p>
          <p className='updateTime'>{updateTime}</p>
          {date ? <p className='updateTime'>{date}</p> : null}
        </div>
      </Link>
    </div>
  )
}
// 属性规则处理
NovelsItem.defaultProps = {
  info: null
};
NovelsItem.propTypes = {
  info: PropTypes.object
}