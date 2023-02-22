import React, { useState, useEffect } from 'react';
import { Form, Input, Toast } from 'antd-mobile';
import './Register.less';
import NavBarAgain from '../../components/NavBarAgain/NavBarAgain';
import api from '../../api';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import _ from '../../assets/utils';
import ButtonAgain from '../../components/ButtonAgain/ButtonAgain';

export default function Register(props) {
  let {  navigate, usp } = props;
  // 按钮是否禁用
  const [disabled, setDisabled] = useState(false),
    [sendText, setSendText] = useState('发送验证码');


  const [visible, setVisible] = useState(false);

  // 自定义表单校验规则
  const validate = {
    email(_, value) {
      value = value.trim();
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value.length === 0) return Promise.reject(new Error('邮箱为必填项!'))
      if (!reg.test(value)) return Promise.reject(new Error('邮箱格式有误!'))
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

  useEffect(() => {


    //组件销毁的时候生效，清除定时器
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, [])

  // 状态
  const [formIns] = Form.useForm();

  // 表单提交
  const submit = async () => {
    try {
      await formIns.validateFields();
      let { email, userName, password, code } = formIns.getFieldValue();
      console.log(email);
      // 上下两个code重名，用 重命名的方法
      let { code: codeHttp, msg } = await api.register(email, userName, password, code)
      if (+codeHttp !== 200) {
        Toast.show({
          icon: 'fail',
          content: msg
        });
        // 重置code
        formIns.resetFields(['code']);
        return;
      } else {
        Toast.show({
          icon: 'success',
          content: msg
        });
      }
      //跳转到登录
      navigate('/login?register=1',{replace: true});
    } catch (_) {

    }
  }
  // 倒计时
  let timer = null,
    num = 31;
  const countDown = () => {
    num--;
    if (num === 0) {
      clearInterval(timer);
      timer = null;
      setSendText(`发送验证码`);
      setDisabled(false);
      return;
    }
    setSendText(`${num}秒后重发`);
  };
  // 发送验证码
  const send = async () => {
    try {
      await formIns.validateFields(['email']);
      let email = formIns.getFieldValue('email');
      let { code, msg } = await api.sendEmail(email);
      if (+code !== 200) {
        Toast.show({
          icon: 'fail',
          content: '发送失败'
        })
        return;
      }
      //发送成功，按钮开始倒计时，不可操作
      setDisabled(true);
      countDown;
      if (!timer) timer = setInterval(countDown, 1000);
    } catch (_) {

    }
  }

  return (
    <div className='login-box'>
      <NavBarAgain title="注册" />
      {/*  */}
      <Form
        layout='horizontal'
        style={{ '--border-top': 'none' }}
        footer={
          <ButtonAgain color='primary' onClick={submit}
          >
            注册
          </ButtonAgain>
        }
        form={formIns}
        initialValues={{ email: '', userName: '', password: '', code: '' }}
      >
        <Form.Item name='email' label='邮箱' rules={[{ validator: validate.email }]}>
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item name='userName' label='用户名' >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' label='密码' >
          <div className='password'>
            <Input
              className='input'
              placeholder='请输入密码'
              type={visible ? 'text' : 'password'}
            />
            <div className='eye'>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          </div>
        </Form.Item>
        <Form.Item name='code' label='验证码' rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain size='small' color='primary'
              disabled={disabled}
              onClick={send}>
              {sendText}
            </ButtonAgain>
          }
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}
