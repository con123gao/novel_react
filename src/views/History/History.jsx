import React, { useEffect, useState } from "react";
import { SwipeAction, Toast } from 'antd-mobile';
import styled from "styled-components";
import { connect } from 'react-redux';
import action from '../../store/action';
import NavBarAgain from '../../components/NavBarAgain/NavBarAgain';
import NovelsItem from '../../components/NovelsItem/NovelsItem';
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain';
import api from "../../api";

/* 样式 */
const StoreBox = styled.div`
    .box {
        padding:30px;
    }
`;

/**
 * 我的收藏
 * @returns 
 */
const History = function History(props) {
  let { today, base: { info: userInfo, location }, queryUserInfoAsync, navigate } = props;
  const [collectNovelList, setCollectNovelList] = useState([])
  useEffect(() => {
    // 第一次加载完毕:看是否登录
    if (!userInfo) queryUserInfoAsync();
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

    //TODO 历史列表
    (async () => {
      try {
        let { msg, data } = await api.getHistoryNovel();
        setCollectNovelList([...data]);
      } catch (_) {

      }
    })();
  }, [collectNovelList]);

  // 移除收藏
  const handleRemove = async (id) => {
    try {
      let { msg, code } = await api.collectNovel(+id);
      if (+code === 200) {
        Toast.show({
          icon: 'success',
          content: msg
        });
        let { msg, data } = await api.collectNovelList();
        setCollectNovelList([...data]);
      } else {
        Toast.show({
          icon: 'fail',
          content: msg
        });
      }
    } catch (_) {

    }
  };

  return <StoreBox>
    <NavBarAgain title="我的收藏" />
    {collectNovelList.length !== 0 ?
      <div className="box">
        {collectNovelList.map(item => {
          let { id } = item;
          return <SwipeAction key={id} rightActions={[{
            key: 'delete',
            text: '删除',
            color: 'danger',
            onClick: handleRemove.bind(null, id)
          }]}>
            <NovelsItem info={item} />
          </SwipeAction>;
        })}
      </div> :
      <SkeletonAgain />
    }
  </StoreBox>;
};
export default connect(
  state => {
    return {
      base: state.base,
      store: state.store
    }
  },
  { ...action.base, ...action.store }
)(History);