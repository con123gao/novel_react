import React, { useEffect, useRef, useState } from 'react'
import { Button, Space, Steps, Card, Input, Toast } from 'antd-mobile'
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from 'antd-mobile-icons'
import _ from '../../assets/utils'
import api from '../../api'
import { connect } from 'react-redux';
import action from '../../store/action';
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain'

const { Step } = Steps
import './Advice.less'
import HomeHead from '../../components/HomeHead/HomeHead'
/**
 * 用纵向步骤条
 * 和卡片
 * @returns 
 */
const Advice = function Advice(props) {
  const input_advice = useRef();
  let { info, queryUserInfoAsync, navigate } = props;
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"))
  const [adviceList, setAdviceList] = useState([])
  useEffect(() => {
    //判断是否登陆
    if (!info) {
      queryUserInfoAsync();
    }
    (async () => {
      try {
        let { code, data } = await api.getAdviceList();
        if (+code === 200) {
          setAdviceList([...data])
        }
      } catch (_) {
      }
    })();
  }, [])

  return (
    <div className='advice-box'>
      {/* 头部 */}
      <HomeHead today={today}></HomeHead>
      {/* 步骤条 */}
      {console.log(adviceList)}
      {
        adviceList ? adviceList.length > 0 ?
          <Steps
            direction='vertical'
            // 选中到第几个
            current={0}
            style={{
              '--title-font-size': '15px',
              '--description-font-size': '15px',
              '--indicator-margin-right': '40px',
              '--icon-size': '22px',
            }}
          >
            {
              adviceList.map((item) => {
                const { id,createTime, description, status, userName } = item
                return <Step key={id}
                  title={'日期：'+createTime}
                  description={
                    <Card
                      headerStyle={{
                        color: '#1677ff',
                      }}
                      bodyClassName={{ 'color': 'var(--adm-color-success)' }}
                      title={'用户: '+userName}
                    >
                      {'建议：'+description}
                    </Card>
                  }
                  status={+status===0?'error':'finish'}
                />
              })
            }
          </Steps>
          : null
          : <SkeletonAgain />
      }


      <div className='advice-input'>
        <Input placeholder=' 请输入内容' clearable 
        ref={input_advice}
        onEnterPress={
          (e) => {
            let { value: input } = e.target
            //判断是否登录
            if (!info) {
              Toast.show({
                icon: 'fail',
                content: '请先登录'
              })
              return;
            }

            //登录了
            let resData = api.writeAdvice(input);
            resData.then((data) => {
              let { msg, code } = data;
              console.log(code, msg);
              if (+code === 200) {
                Toast.show({
                  icon: 'success',
                  content: msg
                })

                // setAdviceList([...a])
              } else {
                Toast.show({
                  icon: 'fail',
                  content: msg
                })
              }
              input_advice.current.clear()
            })

          }
        } />
      </div>
    </div>
  )
}
export default connect(
  state => state.base,
  action.base
)(Advice);