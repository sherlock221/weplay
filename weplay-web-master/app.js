//导入命名空间
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs   = require("ejs");

//自定义中间件
var middle_console = require("./middleware/console_param");

//日志&&缓存
//var cache = require("./cache/cache");
var logger = require('morgan');
var log4j = require("./log");

//路由
var router = require("./routes/router");
var Result = require("./routes/code/code");

//redis
var redis = require('./models/redis')();

//设置
var app = express();
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


//是否打印异常
var showErrOnConsole = true;

//中间件使用
//gzip / deflate
log4j.use(app);
app.use(favicon());
//log4j代替 需要查看请求状态请开启
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
//app.use(session({ secret: "keyboard cat" }));
app.use(express.static(path.join(__dirname, 'public')));
//打印http参数
app.use(middle_console());

//路由配置
router.use(app);

//建立socket连接
app.use(function(req, res, next){
    req.socket.on('error', function(err){
        console.error(err.stack);
    });
    next();
});


//配置404页面
app.use(function(req, res, next) {
    var err = new Error('资源未找到');
    err.status = 404;
    res.send(404);
});


//捕获全系统异常
app.use(function(err, req, res, next){
    console.log("系统捕获异常...");
    //打印到控制台
    showErrOnConsole == true ? console.error(err.stack) : "";
    //异常统一使用json返回
    res.charset = 'utf-8';

    if(!err.code)
        err.code = Result.DB_ERROR;

    res.json(err);
});


module.exports = app;
