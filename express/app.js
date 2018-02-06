var express = require('express');
var app = express();
const ip = require('ip')
var cors = require('cors')
var multer = require('multer')
var upload = multer({ dest: 'ak/' })
var fs = require('fs'); 
const querystring = require("querystring");
//解析fromdata

var corsOptions = {
  origin: 'http://172.31.0.127:8088', //只有百度可以访问
  optionsSuccessStatus: 200 
}
//所有请求不会跨域
app.use(cors(corsOptions),function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//存放图片
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ak/')
  },
  filename: function (req, file, cb) {
		console.log(file)
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
app.post('/ak',upload.array('pic', 12),(req,res)=>{
	console.log(req.files);
	console.log(req.body);
	var param = querystring.parse(req.body.param);
	console.log(typeof param)

	fs.writeFile('./test2.txt', JSON.stringify(param), function(err) {  
    if (err) {  
        throw err;  
    }  
    console.log('Saved.');  
    // 写入成功后读取测试  
    fs.readFile('./test2.txt', 'utf-8', function(err, data) {  
        if (err) {  
            throw err;  
        }  
        console.log(data);  
    });  
});  


	res.send('243');
});

app.get('/user', function (req, res, next) {
	res.send({ret_code: '123'});
})

var server = app.listen(3000, function () {
  const IP = ip.address();
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', IP, port);
});