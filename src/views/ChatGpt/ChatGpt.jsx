import React, { useEffect, useRef } from 'react'
import { CapsuleTabs, NoticeBar, Divider, Image, Input } from 'antd-mobile'
import { QuestionCircleOutline, PlayOutline } from 'antd-mobile-icons'
// markdown样式
import { marked } from 'marked' // 导入markdown转换器
import hljs from 'highlight.js' // 导入markdown代码块高亮包
import "highlight.js/styles/atom-one-light.css" // 代码块具体的高亮样式

import './ChatGpt.less'

export default function ChatGpt() {
    let testData = "```typescript\n// markdown样式\nimport {marked} from 'marked' // 导入markdown转换器\nimport hljs from 'highlight.js' // 导入markdown代码块高亮包\n```"
    // let testData = "你好啊"

    const showAnswer = useRef()
    function Get_Note() {
        return marked(testData)
    }

    useEffect(() => {
        showAnswer.current.innerHTML = Get_Note()
        hljs.highlightAll() // 高亮代码块
    }, [])

    return (
        <div className='gpt-box'>
            <NoticeBar content='基于外部API进行二次开发,仅供学习使用' color='alert' closeable />
            {/* 头部 */}
            <CapsuleTabs>
                <CapsuleTabs.Tab title='问答' key='gpt-QA'>
                    {/* 问答模块 */}
                    {/* 问 */}
                    <div className="problem">
                        <span className='icon-Q'><QuestionCircleOutline fontSize={20} /></span>
                        <p className='show-Q'>
                            你好撒撒拉森金卡金卡了数据库连接的卡接口的呀萨基沙和尚离开萨拉就是拉克丝
                        </p>
                    </div>
                    {/* 答 */}
                    <div className='answer'>
                        <span className='icon-A'>
                            <Image lazy src='/404' width={30} height={30} />
                        </span>
                        <p className='show-A' ref={showAnswer}>

                        </p>
                    </div>
                    {/* 输入问题框 */}
                    <div className='inputQ'>
                        <Input
                            placeholder='请输入内容'
                            value=''
                            onEnterPress={val => {

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
