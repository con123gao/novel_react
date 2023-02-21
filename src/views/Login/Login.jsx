import React, { useState, useEffect } from 'react';
import { Form, Input, Toast, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import action from '../../store/action'
import './Login.less';
import NavBarAgain from '../../components/NavBarAgain/NavBarAgain';
import api from '../../api';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import _ from '../../assets/utils';
import { Link } from 'react-router-dom'
import ButtonAgain from '../../components/ButtonAgain/ButtonAgain';
/**
 * 登录：
 *  1.存储token到：具备有效期的localStorage中
 *  2.redux判断登陆状态
 *  3.提示
 *  4.跳转【细节】
 * @returns 
 */
const Login = function Login(props) {
    let { queryUserInfoAsync, navigate, usp } = props;

    const [visible, setVisible] = useState(false)
    // 状态
    const [formIns] = Form.useForm();

    // 表单提交
    const submit = async () => {
        try {
            await formIns.validateFields();
            let { userName, password } = formIns.getFieldValue();
            console.log(userName);
            console.log(password);
            let { code, msg, data } = await api.login(userName, password)
            let { token, userInfo } = data
            // let {} = userInfo
            if (+codeHttp !== 200) {
                Toast.show({
                    icon: 'fail',
                    content: msg
                });
                // 重置code
                formIns.resetFields(['code']);
                return;
            }
            //登录成功：存储到Token，存储登陆者信息到redux，提示，跳转
            //存储token
            _.storage.set('tk', token)
            //有些接口传递的时候必须要基于 请求头传递token ：authorization: token
            await queryUserInfoAsync();//派发任务，同步redux中的状态信息
            //提示和跳转
            Toast.show({
                icon: 'success',
                content: msg
            })
            navigate(['/']);
        } catch (_) {

        }
    }

    return (
        <div className='login-box'>
            <NavBarAgain title="登录" />
            {/*  */}
            <Form
                layout='horizontal'
                style={{ '--border-top': 'none' }}
                footer={
                    <ButtonAgain color='primary' onClick={submit}>
                        登录
                    </ButtonAgain>
                }
                form={formIns}
                initialValues={{ email: '', code: '' }}
            >
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
            </Form>
            <Link
                to={{ pathname: `/register` }}
                className=''
            >
                立即注册
            </Link>
        </div>
    )
}
// redux
export default connect(
    null,
    action.base
)(Login);