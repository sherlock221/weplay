
module.exports = function (req, res, next) {
    return  function(req,res,next){
        console.warn("http参数显示功能开启...");
        console.log("param  : ", req.params);
        console.log("get : ", req.query);
        console.log("post : ", req.body);
        next();
    }
};