import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 5000;                        //响应时间
//配置请求头在使用post请求的时候如果没有使用from-data（用了fromdata对象默认就是from-data）配置就是这个，并且这个配置可以被当前页面的请求覆盖
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  
// axios.defaults.baseURL = '你的接口地址';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    // if(config.method  === 'post'){
		// 		console.log( config)
		// 		config.data = qs.stringify(config.data);			
		// }
		// console.log(config)
    return config;
},(error) =>{
      
    return Promise.reject(error);
});

// 添加请求拦截器
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});


// 添加响应拦截器

export default axios;