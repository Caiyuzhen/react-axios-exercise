import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";


//📦封装好 axios 的实例对象, 包含了定义好的 URL、timeout 信息, 以便统一管理
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
})



//🔥🔥🔥也可以统一添加拦截器
//🔫 Axios 请求拦截器
instance.interceptors.request.use(config => {//请求正常发送的回调
	//比如只要发送请求，都在页面内弹出一个 loading 加载框
	// config.loading = true
	
	//比如必须携带 token, 否则回到登录页面, 拿到 router 对象, 鉴权

	//比如做一些序列化的操作，比如将对象转换成字符串

	console.log('请求被拦截');
	return config;
},err => {//请求异常的回调
	//...
}); 




//🔫 Axios 响应拦截器
axios.interceptors.response.use(res => {//响应正常拿到数据的回调
	return res.data;
},err => {//响应异常的回调
	if(err && err.response){ //判断响应的状态码
		switch(err.response.status){
			case 400: 
				console.log('请求错误')
				break;
			case 401: 
				console.log('未授权访问')
				break;
			default:
				console.log('其他错误');
		}
	}
	return err
})



//导出自己封装好的 axios 实例
export default instance