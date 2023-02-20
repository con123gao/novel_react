import React, { useState, useEffect } from 'react';
import { Form, Input, Toast, Button } from 'antd-mobile';
import './Login.less';
import NavBarAgain from '../../components/NavBarAgain/NavBarAgain';
import api from '../../api';
import _ from '../../assets/utils';

export default function Login() {

  // 自定义表单校验规则
  const validate = {
    phone(_, value) {
      value = value.trim();
      let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (value.length === 0) return Promise.reject(new Error('手机号为必填项!'))
      if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'))
      return Promise.resolve();
    },
    code(_, value) {
      value = value.trim();
      let reg = /^\d{6}$/;
      if (value.length === 0) return Promise.reject(new Error('验证码为必填项!'))
      if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'))
      return Promise.resolve();
    }
  }

  // 状态
  const [formIns] = Form.useForm();

  // 表单提交
  const submit = (values) => {
    // 表单校验已经成功了
    // values ：From表单中自动收集的每个表单的信息
    Toast.show({
      icon: 'success',
      content: '校验成功'
    })
    console.log(values);
  }
  // 发送验证码
  const send = async () => {
    try {
      await formIns.validateFields(['phone']);
      Toast.show({
        icon: 'success',
        content: '验证码发送成功'
      })
    } catch (_) {

    }
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
        <Form.Item name='phone' label='手机号' rules={[{ validator: validate.phone }]}>
          <Input placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item name='code' label='验证码' rules={[{ validator: validate.code }]}
          extra={
            <Button size='small' color='primary' onClick={send}>
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
