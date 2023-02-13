import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// REM
import 'lib-flexible';
// 处理最大宽度
(function(){
    const handleMax = function handleMax(){
        let html = document.documentElement,
        root=document.getElementById('root'),
        // size=parseFloat(html.style.fontSize);
            deviceW=html.clientWidth;
        root.style.maxWidth = "750px";
        if(deviceW>=750){
            html.style.fontSize='75px';
        }
    };
    handleMax();
    window.addEventListener('resize',handleMax);
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
