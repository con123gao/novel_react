import React from 'react'
import { Skeleton } from 'antd-mobile'
/**
 * 对于骨架屏的二次封装
 * @returns 
 */
export default function SkeletonAgain() {
    return <div className='skeleton-again-box'>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
    </div>
}
