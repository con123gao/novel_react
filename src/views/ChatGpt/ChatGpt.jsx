import React, { useEffect, useRef, useState } from 'react'
import { CapsuleTabs, NoticeBar, Divider, Image, Input, Toast, Popover } from 'antd-mobile'
import { QuestionCircleOutline, PlayOutline, ContentOutline, FileOutline } from 'antd-mobile-icons'
import copy from 'copy-to-clipboard';

// markdown样式
import { marked } from 'marked' // 导入markdown转换器
import hljs from 'highlight.js' // 导入markdown代码块高亮包
import Highlight from 'react-highlight'
import "highlight.js/styles/atom-one-light.css" // 代码块具体的高亮样式

import _ from '../../assets/utils'
import api from '../../api'
import './ChatGpt.less'
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain'
import { connect } from 'react-redux';
import action from '../../store/action';

const ChatGpt = function ChatGpt(props) {
    let testData = "```typescript\n// markdown样式\nimport {marked} from 'marked' // 导入markdown转换器\nimport hljs from 'highlight.js' // 导入markdown代码块高亮包\n```"
    let { info, queryUserInfoAsync } = props;

    // 用户 问答列表
    const [userInput, SetUserInput] = useState('')
    const [imgInput, SetImgInput] = useState('可爱的布偶猫')
    const [imgUrl, SetImgUrl] = useState('https://oaidalleapiprodscus.blob.core.windows.net/private/org-9rYx1Dz8dCC2cDMJTztqT9DC/user-NtGHdqh4KrTqp7bCVGMUNIg8/img-Kp3gaLrIo4fuDJc8TWmKhWly.png?st=2023-02-20T03%3A42%3A21Z&se=2023-02-20T05%3A42%3A21Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-19T19%3A35%3A44Z&ske=2023-02-20T19%3A35%3A44Z&sks=b&skv=2021-08-06&sig=4aux/nuKwJnZD7ZhohWdt%2B5KmSwudKSbzni6IWQZ4QE%3D')
    const [userQA, setUserQA] = useState([])
    const input_QA = useRef()
    const input_Img = useRef()

    // 复制内容
    function copyCot(cot) {
        copy(cot);
        Toast.show({
            icon: 'success',
            content: '复制成功'
        })
    }

    useEffect(() => {
        if (!info) {
            queryUserInfoAsync();
        }
        (async () => {
            try {

            } catch (_) {
            }
        })();

    }, [userQA])

    return (
        <div className='gpt-box'>
            <NoticeBar content='基于外部API进行二次开发,仅供学习使用' color='alert' closeable />
            {/* 头部 */}
            <CapsuleTabs>
                <CapsuleTabs.Tab title='问答' key='gpt-QA'>
                    {/* 问答模块 */}
                    <div>
                        {
                            userQA.length === 0 ? <SkeletonAgain /> :
                                <>
                                    {
                                        userQA.map((item, index) => {
                                            let nowText = item.text.charAt(0) === '机' ? item.text.slice(4) : item.text.charAt(0) === 'R' ? item.text.slice(6) : item.text.charAt(0) === 'B' ? item.text.slice(4) : item.text
                                            return (
                                                <div key={index}>
                                                    <div className="problem">
                                                        <span className='icon-Q'><QuestionCircleOutline fontSize={20} /></span>
                                                        <p className='show-Q'>
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                    {/* 答 */}
                                                    <div className='answer'>
                                                        <span className='icon-A'>
                                                            <Image lazy src={info ? info.avatar : '/404'} width={30} height={30} />
                                                        </span>
                                                        <p className='show-A'>



                                                            <span className='copy' onClick={() => copyCot(nowText)}>
                                                                <Popover
                                                                    content='复制成功'
                                                                    trigger='click'
                                                                    placement='right'
                                                                    defaultVisible={false}
                                                                >
                                                                    <FileOutline fontSize={20} color='var(--adm-color-weak)' />
                                                                </Popover>
                                                            </span>
                                                            <Highlight>
                                                                {nowText}
                                                            </Highlight>
                                                        </p>
                                                    </div>
                                                </div>
                                            )

                                        })
                                    }
                                </>
                        }
                    </div>
                    {/* 输入问题框 */}
                    <div className='inputQ'>
                        <Input
                            ref={input_QA}
                            placeholder='请输入内容'
                            onChange={
                                val => { SetUserInput(val) }
                            }
                            onEnterPress={val => {
                                let { value } = val.target
                                if (!value.endsWith('?')) {
                                    value += '?'
                                }
                                //循环获取 当前问题，回答，拼接
                                let nowQ = ''
                                if (userQA.length > 0) {
                                    userQA.map((item) => {
                                        nowQ += item.value + item.text + '\n'
                                    })
                                }
                                nowQ = nowQ + 'Human:' + value
                                input_QA.current.clear()
                                let curAnswer = api.getAnSwer(nowQ);
                                curAnswer.then((d) => {
                                    console.log(d);
                                    let { data } = d
                                    let { text } = data
                                    let qaObj = { value, text }
                                    userQA.push(qaObj)
                                    setUserQA([...userQA])
                                })
                            }}
                            style={{
                                '--text-align': 'left',
                                '--font-size': '15px',
                                '--placeholder-color': '#a3a5a9'
                            }}
                            className='input-section'
                        >
                        </Input>
                        <span onClick={() => {
                            let value = userInput
                            if (!value.endsWith('?')) {
                                value += '?'
                            }
                            //循环获取 当前问题，回答，拼接
                            let nowQ = ''
                            if (userQA.length > 0) {
                                userQA.map((item) => {
                                    nowQ += item.value + item.text + '\n'
                                })
                            }
                            nowQ = nowQ + 'Human:' + value
                            console.log(nowQ);
                            input_QA.current.clear()
                            console.log(input_QA);
                            let curAnswer = api.getAnSwer(nowQ);
                            curAnswer.then((d) => {
                                console.log(d);
                                let { data } = d
                                let { text } = data
                                let qaObj = { value, text }
                                userQA.push(qaObj)
                                setUserQA([...userQA])
                            })
                        }}><PlayOutline fontSize={24} /></span>
                    </div>

                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='图片' key='gpt-Image'>
                    {/* 图片模块 */}
                    <div className="problem">
                        <span className='icon-Q'><QuestionCircleOutline fontSize={20} /></span>
                        <p className='show-Q'>
                            {imgInput}
                        </p>
                    </div>
                    <div className='showImg'>
                        <Image lazy src={imgUrl} />
                    </div>
                    {/* 输入问题框 */}
                    <div className='inputQ'>
                        <Input
                            placeholder='请输入想获取的图片的描述'
                            onEnterPress={val => {
                                let { value } = val.target
                                SetImgInput(value)
                                let curImage = api.getImage(value);
                                curImage.then((d) => {
                                    console.log(d);
                                    let { data } = d
                                    let { url } = data
                                    SetImgUrl(url)
                                })
                            }}
                            style={{
                                '--text-align': 'left',
                                '--font-size': '15px',
                                '--placeholder-color': '#a3a5a9'
                            }}
                            className='input-section'
                        >
                        </Input>
                        <span><PlayOutline fontSize={24} /></span>
                    </div>
                </CapsuleTabs.Tab>

            </CapsuleTabs>
        </div >
    )
}
export default connect(
    state => state.base,
    action.base
)(ChatGpt);