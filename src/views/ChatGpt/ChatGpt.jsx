import React, { useEffect, useRef, useState } from 'react'
import { CapsuleTabs, NoticeBar, Divider, Image, Input } from 'antd-mobile'
import { QuestionCircleOutline, PlayOutline } from 'antd-mobile-icons'
// markdown样式
import { marked } from 'marked' // 导入markdown转换器
import hljs from 'highlight.js' // 导入markdown代码块高亮包
import "highlight.js/styles/atom-one-light.css" // 代码块具体的高亮样式

import _ from '../../assets/utils'
import api from '../../api'
import './ChatGpt.less'
import SkeletonAgain from '../../components/SkeletonAgain/SkeletonAgain'

export default function ChatGpt() {
    let testData = "```typescript\n// markdown样式\nimport {marked} from 'marked' // 导入markdown转换器\nimport hljs from 'highlight.js' // 导入markdown代码块高亮包\n```"
    // let testData = "你好啊"

    // 用户 问答列表
    const [userInput, SetUserInput] = useState('')
    const [userQA, setUserQA] = useState([])
    const showAnswer = useRef()
    function Get_Note() {
        return marked(testData)
    }

    useEffect(() => {
        (async () => {
            try {
                // let cur_answer = await api.getAnSwer(userInput);
                // showAnswer.current.innerHTML = cur_answer
                hljs.highlightAll() // 高亮代码块
                // userQA.push({ userInput, cur_answer })
                // setNovelsList([...userQA]);
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
                                                            <Image lazy src='/404' width={30} height={30} />
                                                        </span>
                                                        <p className='show-A' ref={showAnswer}>
                                                            {item.text}
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
                            placeholder='请输入内容'
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
                                console.log(nowQ);
                                val.target.value = ''
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
                        <span><PlayOutline fontSize={24} /></span>
                    </div>

                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='图片' key='gpt-Image'>
                    {/* 图片模块 */}

                </CapsuleTabs.Tab>

            </CapsuleTabs>
        </div>
    )
}
