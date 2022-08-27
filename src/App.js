import React, {PureComponent} from 'react'
import './App.css';
import axios from 'axios';
//🔥导入自己封装好的 axios 配置对象
import instance from './service/request';



/*
网络请求测试网站 http://httpbin.org/#/
	请求地址 url, 最终会返回一个 promise
		传参有两种写法，一种是写在 get 的 ？后面
		另一种是写在 params 里边，到时候会自动拼接到url 后边


	请求 header 在 返回的 data 的 config 里边！！！！

	响应数据为 data , 响应 header data 下的 headers , 其他的都是 axios 帮我们加上的附带信息！！
	
	HOW？
		ES6 写法
			【Promise】
				通过 axios 发送请求，返回 Promise 
					好处是可以很方便的拿到 catch 错误信息, 直接 catch

		ES7 写法
			【await， async】
				外层 await, 内层的参数赋值给 async axios 来发送网络请求
					拿错误信息比较麻烦，需要 try catch

	Axios 本质上在底层都是调用 request api
		配置项：
		    //请求地址
				url           


			//请求参数
				params:{       
					name: 'name',
					age: 'age',
					id: 'id',
					type: 'type',
					...
				}


			//基础地址，会自动放在 url 前面
				baseURL       


			//在向服务器发送请求前, 修改请求数据, 对 data 做任意转换, 只能用在 ‘PUT’ ‘POST’ ‘PATCH’ 这几个请求上, 因为这几个请求才有 data
				tarnsformRequest: [function (data,headers){    
						return data
					}
				]


 			//自定义请求头
				headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'}  


			//请求超时时间
				timeout: 1000,  


			//跨域请求时是否需要使用凭证
				withCredentials: true,  


			//请求参数
				data: {        
					firstName: 'Fred',
				}


			//返回一个 Promise 对象，用来处理请求配置
				adapter: function (config){  
					...
				}
			

			//auth 表示使用 HTTP 基础验证，并提供凭据
				auth: {       
					username: 'jane',
					password: 'saoijcsac'
				}


			//表示服务器返回的数据类型
				responseType: 'json' 


			//设置 httpAgent 以支持 keep-alive 的 HTTP 请求
				httpAgent: new http.Agent({ keepAlive: true }), 


			//表示代理服务器的配置, 覆写掉已由的 header 
				proxy: {   
					host: '127.0.0.1',
					port: 9000,
					auth: { username: 'Mike', password: 'rapunzal' }
				}

			
			//指定一个对象来取消请求
				cancelToken: new CancelToken(function(cancel){
					...
				})
*/



export default class App extends PureComponent {
	//二：存储请求回来的数据
	constructor(props){
		super(props);

		this.state = {
			products: []
		}
	}



	//一：在组件挂载时发送网络请求
	componentDidMount(){
		//拿到数据并进行存储
		// this.setState({
		// 	 products: [...this.status.products, ...res];//先拷贝一份原来的数据，再传入新数据
		// })

		//🔥Get 请求（写法一）
		axios({ //这里会返回一个 promise 对象
			url:"http://httpbin.org/get",
			params:{
				name:'Kim',
				age: 18,
			},
			method: "get" //默认为 get
		}).then(res => {  //请求成功时，resolve	的回调
			console.log(res)
		}).catch(err => { //请求失败时，reject 的回调
			console.error(err)
		});


		//🔥也可以这么写,在 axios 后边加个 get、post...,会返回 promise 对象
		axios.get('http://httpbin.org/get',{
			params:{
				name: 'Amy',
				age: 20,
			},
		}).then(res => {
			console.log('成功了');
		}).catch(err => {
			console.error('失败了');
		})


		//📦Post 请求(写法一)
		axios({ //会返回 promise 对象
			url:"http://httpbin.org/post",
			data:{
				name:'Jimmy',
				age: 16,
			},
			method: "post" //其他请求方法记得填写！！否则都是 get！！
		}).then(res => {
			console.log(res)
		}).catch(err => {
			console.error(err)
		})


		//📦Post请求（写法二）在 axios 后边加个 get、post..., 会返回 promise 对象
		axios.post('http://httpbin.org/post',{
			data:{
				name:"Lucy",
				age:22
			},
		}).then(res => {
			console.log('成功发送 post 请求');
		}).then(err => {
			console.error('发送 post 请求失败');
		})







		//🚀发送多个网络请求的方法, 当两个请求都有响应才会触发 results 的回调
		//第一步 - 定义两个请求对象
		const request1 = axios({
			baseURL: "http://httpbin.org",// baseURL 的写法, 下面就不用写这么长了
			timeout:5000,
			url: "/get",
			params: {name: "Adam", age:"22"},
		})

		const request2 = axios({
			url: "http://httpbin.org/post",
			params: {name: "Diana", age:"20"},
			method: "post",
		})

		//👇第二步 - 写法一：两个获得的是两个数组
		axios.all([request1, request2]).then(res => {
			console.log('两个请求都得到了响应：');
			console.log(res);
		}).catch(err => {
			console.log(err);
		})

		//👇第二步 - 写法二：获得的是展开的数组(数组的解构,相当于赋值了两个数组)
		axios.all([request1,request2]).then(([res1, res2])=>{
			console.log('两个请求都得到了响应并被解构：');
			console.log(res1);
			console.log(res2);
		})








		//👇创建多个实例来发送请求, 并且指定不同的 baseURL
			//场景：比如公司有多个服务器, 存储不同的数据
			//每个实例都可以有不同的配置项
		const instance1 = axios.create({
			baseURL: 'http://localhost:3000/api/v1/',
			timeout: 3000,
			headers: {
				//...
			}
		})

		const instance2 = axios.create({
			baseURL: 'http://gooogle/api/v1/',
			timeout: 5000,
			headers: {
				//...
			}
		})

		//也可以单独传入默认配置
		// instance2.defaults.headers.common['Authorization'] = AUTH_TOKEN
	






		//🔫 Axios 请求拦截器
		axios.interceptors.request.use(config => {//请求正常发送的回调
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



		//🪤 对 Axios 进行二次封装, 暴露自己的 Api , 避免 Axios 出现问题
		//详见 src
		instance.get("http://httpbin.org/get",{
			url: '/get',
			params: {
				name: 'Martha',
				age: 2666,
			}
		}).then( res => {
			console.log(res);
			console.log('成功使用自定义封装的 Axios');
		})
		

	}



//——————————————————————————————————————————————————————————————————————————



	//ES7 后开始可以用 await， async 去发送请求, await 必须应用到 async 内部
	async componentDidMount2() {

		//await 配合 上面 的 async 方法去同步获取信息, 不获取错误信息的写法
		// const result = await axios.get("http://httpbin.org/get",{
		// 	params:{
		// 		name:'Jane',
		// 		age: 28,
		// 	}
		// })
		// console.log('拿到了 await 的结果:');
		// console.log(result);


		//需要获取错误信息的写法
		try {
			const result = await axios.get("http://httpbin.org/get",{
                params:{
                    name:'Hank',
                    age: 26,
                }
            });
			console.log('拿到了 await 的结果:');
			console.log(result);

		} catch(err){
		console.log('拿到了 await 的错误信息:');
			console.log(err);
		}


	}
		

	//三：展示数据
	render(){
		return(
			<div>
				ABC
			</div>
		)
	}
}






