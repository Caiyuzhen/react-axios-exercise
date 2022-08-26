import React, {PureComponent} from 'react'
import './App.css';
import axios from 'axios';


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


		/*
		网络请求测试网站 http://httpbin.org/#/
			请求地址 url, 最终会返回一个 promise
				传参有两种写法，一种是写在 get 的 ？后面
				另一种是写在 params 里边，到时候会自动拼接到url 后边
		*/



		//🔥一：Get 请求
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


		//👇也可以这么写,在 axios 后边加个 get、post...
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



		//🔥一：Post 请求
		axios({
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


		//👇也可以这么写,在 axios 后边加个 get、post...
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


