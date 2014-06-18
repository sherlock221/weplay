/**
 * 用户控制器
 * @type {*|string}
 */

var url = process.env.WEPLAY_IO_URL || 'http://localhost:3001';
var redis = require("./../redis")();


//建立连接
exports.connect = function(req, res, next){
    redis.get('weplay:frame', function(err, image){
        if (err) return next(err);
        redis.get('weplay:connections-total', function(err, count){
            if (err) return next(err);
            res.render('index',{
                img: image.toString('base64'),
                io: url,
                connections: count
            });
        });
    });
};

exports.screenshot = function(req, res, next){
    redis.get('weplay:frame', function(err, image){
        if (err) return next(err);
        res.writeHead(200, {
            'Content-Type':'image/png',
            'Content-Length': image.length});
        res.end(image);
    });
}
