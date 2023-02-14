import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// redux
import { Provider } from 'react-redux'
import store from './store'

// ANTD-MOBILE
import { ConfigProvider } from "antd-mobile";
// antd国际化
import zhCN from 'antd-mobile/es/locales/zh-CN'

// REM
import 'lib-flexible';
// 样式
import './assets/reset.min.css'
import './index.less'


// 处理最大宽度
(function () {
    const handleMax = function handleMax() {
        let html = document.documentElement,
            root = document.getElementById('root'),
            // size=parseFloat(html.style.fontSize);
            deviceW = html.clientWidth;
        root.style.maxWidth = "750px";
        if (deviceW >= 750) {
            html.style.fontSize = '75px';
        }
    };
    handleMax();
    window.addEventListener('resize', handleMax);
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>
);
