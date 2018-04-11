// 构建express服务器
var express = require('express');
var Cookies = require('cookies');
var server = express();

//处理访问路径的问题,相当于把/static 路径替换成了/public来访问静态文件
server.use('/static',express.static(__dirname+'/public'));
//设置cookie
server.use((req,res,next)=>{
    let cookies = new Cookies(req,res);
    res.cookies = cookies;
    next();
})
var handleHtml = require('./router/handle-html');
var handleApi = require('./router/handle-api');
server.use('/',handleHtml);
server.use('/api',handleApi);

//配置摸板引擎
var swig = require('swig');
//参数1，摸板引擎的名称，固定字段
//参数2，摸板引擎的方法
server.engine('html',swig.renderFile);
//摸板引擎存放目录的关键字，固定字段
//实际存在的目录
server.set('views',__dirname+'/html');
//注册摸板引擎，固定字段
server.set('view engine','html');
//关闭swig缓存,缓存的目的也是提高node服务器的响应速度
swig.setDefaults({cache:false});

new Promise((resolve,reject)=>{
//连接mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017',(error)=>{
    if(error) {
        console.log('数据库连接失败');
        console.log(error);
    }else {
        console.log('数据库连接成功');
        resolve();
    }
})
}).then(()=>{
    server.listen(8080,'localhost',(req,res)=>{
        console.log('服务器启动 @ localhost:8080');
   })
//    require('./handleDB');
})

















