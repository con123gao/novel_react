import React, { useEffect, useMemo } from 'react'
import { Badge, Toast } from 'antd-mobile'
import { useLocation } from "react-router-dom";
import { LeftOutline, RightOutline, FileOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import action from '../../store/action'
import './Show.less'

const Show = function Show(props) {
  const { navigate } = props
  const { novelId, chapterId, chapterName } = props.params
  const { state } = useLocation();
  console.log(state);

  const base_pre = "http://localhost:8080/book/"

  // ==========下面的逻辑是关于登录/收藏的
  let { base: { info: userInfo, location }, queryUserInfoAsync } = props
  useEffect(() => {
    //第一次渲染完。，如果userInfo不存在，我们派发任务同步登陆者信息
    if (!userInfo) queryUserInfoAsync();

  }, []);

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
          <span content="128"><LeftOutline /></span>
          <span className='stored' onClick={handleStore}><StarOutline /></span>
          <span><RightOutline /></span>
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