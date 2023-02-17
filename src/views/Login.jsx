import React, { useState, useEffect } from 'react';
import { Form, Input, Toast, Button } from 'antd-mobile';
import './Login.less';
import NavBarAgain from '../components/NavBarAgain';
import api from '../api';
import _ from '../assets/utils';

export default function Login() {

  const [formIns] = Form.useForm();

  // 表单提交
  const submit = (values) => {
    // 表单校验已经成功了
    // values ：From表单中自动收集的每个表单的信息
    console.log(values);
  }

  return (
    <div className='login-box'>
      <NavBarAgain title="登陆/注册" />
      {/*  */}
      <Form
        layout='horizontal'
        style={{ '--border-top': 'none' }}
        footer={
          <Button type='submit' color='primary'>
            提交
          </Button>
        }
        onFinish={submit}
        form={formIns}
        initialValues={{ pahone: '', code: '' }}
      >
        <Form.Item name='phone' label='手机号' >
          <Input placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item name='code' label='验证码'
          extra={
            <Button size='small' color='primary'>
              发送验证码
            </Button>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
