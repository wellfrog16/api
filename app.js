const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

// 允许跨域配置
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', 'stand by me, by wellfrog.');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 加载路由
app.use('/imooc-shop', require('./routers/imooc-shop'));


// 定义错误页
app.use((req, res) => {
    res.status(404).json({'code': 404, 'msg': '页面无法找到'});
});
  
app.use((req, res) => {
    res.status(500).json({'code': 500, 'msg': '服务器错误'});
});

// 打开服务，监听端口
var server = app.listen(8001, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});