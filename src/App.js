import React, {PureComponent} from 'react'
import './App.css';
import axios from 'axios';


export default class App extends PureComponent {

	//存储请求回来的数据
	constructor(props){
		super(props);

		this.state = {
			products: []
		}

	}

	//在组件挂载时发送网络请求
	componentDidMount(){
		//拿到数据
		this.setState({
			products: [...this.status.products, ...res]//先拷贝一份原来的数据，再传入新数据
		})
	}

	render(){
		return(
			<div>
				ABC
			</div>
		)
	}
}


