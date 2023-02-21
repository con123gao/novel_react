import React, { useState } from 'react'
import { Button } from 'antd-mobile'
import _ from '../../assets/utils';



export default function ButtonAgain(props) {
    let options = { ...props };
    let { children, onClick: handle } = options
    delete options.children
    // delete options.onClick

    let [loading, setLoading] = useState(false);
    const clickHandle = async () => {
        setLoading(true);
        try {
            await handle();
        } catch (_) {
        }
        setLoading(false);
    }
    if (handle) {
        options.onClick = clickHandle;
    }
    return (
        <Button {...options} loading={loading}>
            {children}
        </Button>
    )
}
