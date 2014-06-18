//log
var log = require("./../log").logger("router");

/**
 * 路由
 * @type {exports}
 */
var userRouter = require("./user_router");

//转发
module.exports.use = function(app){

    //首次建立连接
    app.get("/", userRouter.connect);
    //截屏
    app.get("/screenshot", userRouter.screenshot);


};


