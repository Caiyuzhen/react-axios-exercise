//自定义封装 axios 的 config 配置信息


//测试环境 URL
const devBaseURL = "https://httpbin.org"

//正式环境 URL
const proBaseURL = "https://production.org"

//判断是哪个环境
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000 //请求超时时间