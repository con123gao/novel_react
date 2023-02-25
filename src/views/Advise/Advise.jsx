import React, { useState } from 'react'
import { Steps } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import HomeHead from '../../components/HomeHead/HomeHead'
import _ from '../../assets/utils'
import api from '../../api'
/**
 * 用纵向步骤条
 * 和卡片
 * @returns 
 */
export default function Advise() {
  // 创建所需状态
  const [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"))
  const { Step } = Steps
  return (
    <div>
      {/*  */}
      <HomeHead today={today} />
      <Steps direction='vertical'
        style={{
          '--title-font-size': '23px',
          '--description-font-size': '20px',
          '--indicator-margin-right': '15px',
          '--icon-size': '25px',
        }}
      >
        <Step
          direction='vertical'
          title='填写机构信息'
          status='finish'
          description='完成时间：2020-12-01 12:30'
          icon={<CheckCircleFill />}

        />
        <Step
          title='签约机构'
          status='finish'
          description='完成时间：2020-12-01 12:30'
          icon={<CheckCircleFill />}
        />
        <Step
          title='关联服务区'
          status='finish'
          description='完成时间：2020-12-01 12:30'
          icon={<CheckCircleFill />}
        />
        <Step title='审批失败' status='error' icon={<CheckCircleFill />}/>
      </Steps>
    </div>
  )
}
