import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Toast } from 'antd-mobile'
import { Link, useLocation } from "react-router-dom";
import { LeftOutline, RightOutline, FileOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import action from '../../store/action'
import './Show.less'
import _ from '../../assets/utils'
import api from '../../api'

const Show = function Show(props) {
  const { navigate } = props
  const { novelId, chapterId, chapterCount } = props.params
  const [chapterName, setChapterName] = useState()
  const [isCollect, setIsCollect] = useState(false)

  const base_pre = "http://localhost:8080/book/"

  // ==========下面的逻辑是关于登录/收藏的
  let { base: { info: userInfo, location }, queryUserInfoAsync } = props
  useEffect(() => {
    //第一次渲染完。，如果userInfo不存在，我们派发任务同步登陆者信息

    if (!userInfo) queryUserInfoAsync();
    //查展示的具体信息
    (async () => {
      try {
        let { data: { isCollect, chapterName }, code } = await api.getShowInfo(novelId, chapterId);
        setChapterName(chapterName);
        setIsCollect(isCollect)
      } catch (_) {

      }
    })();
  }, [chapterId]);

  // 点击收藏按钮
  const handleStore = () => {
    if (!userInfo) {
      //未登录
      Toast.show({
        icon: 'fail',
        content: '请先登录'
      });
      // 跳转到登录
      navigate(`/login?to=${location.pathname}`, { replace: true })
      return;
    }
    //TODO 收藏
    (async () => {
      try {
        let { msg, code } = await api.collectNovel(+novelId);
        if (+code === 200) {
          Toast.show({
            icon: 'success',
            content: msg
          });
          let { data: { isCollect, chapterName }, code } = await api.getShowInfo(novelId, chapterId);
          setChapterName(chapterName);
          setIsCollect(isCollect)
        } else {
          Toast.show({
            icon: 'fail',
            content: msg
          });
        }
      } catch (_) {

      }
    })();
  };

  return (
    <div className='show-box'>
      <h2>{chapterName}</h2>
      <iframe src={base_pre + novelId + '/' + chapterId + '.html'} className='show-iframe'
        border="0"
      // marginwidth="0" marginheight="0" 
      >
      </iframe>

      {/* 底部栏，吸底效果 */}
      <div className="tab-bar">
        <div className='back'
          onClick={() => {
            // navigate(`/chapter/${novelId}`);
            navigate(-1);
          }}
        ><FileOutline /></div>
        <div className="icons">
          <span content="128">
            {+chapterId >= 2 ?
              <Link to={{
                pathname: `/show/${novelId}/${parseInt(chapterId) - 1}/${chapterCount}`
              }}>
                <LeftOutline /> 上一章
              </Link>
              :
              <><LeftOutline /> 已经是第一章</>
            }
          </span>
          <span className={isCollect?'stored':''} onClick={handleStore} ><StarOutline /></span>
          <span>
            {console.log(+chapterCount, +chapterId)}
            {+chapterCount - +chapterId > 0 ?
              <Link to={{
                pathname: `/show/${novelId}/${parseInt(chapterId) + 1}/${chapterCount}`
              }}>
                下一章 <RightOutline />
              </Link> :
              <>已经是最后一章 <RightOutline /></>
            }
          </span>
        </div>
      </div>

    </div>
  )
}
export default connect(
  state => {
    return {
      base: state.base,
      store: state.store
    }
  },
  { ...action.base, ...action.store }
)(Show)