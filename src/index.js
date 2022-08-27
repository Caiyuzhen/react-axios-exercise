import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';


//🔥🔥🔥在 index 进行全局的默认请求配置, 后续发送请求就不用写这么多了
axios.defaults.baseURL = 'http://httpbin.org';
axios.defaults.timeout = 5000;
axios.defaults.headers.common['token'] = 'abcdefg'
// axios.defaults.headers.post['Content-Type'] = 'application/text'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//👇避免重复发送请求，先注释掉
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);




