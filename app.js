const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser('secret-wellfrog'));

//
require('./utils/prototype');

// 允许跨域配置
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', 'stand by me, by wellfrog.');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 登陆拦截
app.use((req, res, next) => {
    const path = req.path;
    const method = req.method.toLowerCase();

    // console.log(req.path);
    // console.log(req.method);
    // console.log(req.originalUrl);

    // imooc-shop项目拦截
    if (/^\/imooc-shop\/.+/g.test(path)) {
        // 已登陆，cookie登陆
        if(req.signedCookies.user) {
            next();
        } else {
            // 白名单，未登录可访问
            const whiteList = [
                {path: '/imooc-shop/user/login', method: 'post'},
                {path: '/imooc-shop/user/checklogin', method: 'get'},
                {path: '/imooc-shop/goods', method: 'get'}
            ];

            let pass = false;
            for( const white of whiteList) {
                if (white.path === path && (white.method === method || 'options' === method)) {
                    pass = true;
                    break;
                }
            }

            if (pass) {
                next();
            } else {
                // 白名单未next，返回没有权限
                res.status(401).json({
                    code: 401,
                    data: '没有权限'
                });
            }
        }
    } else {
        next();
    }
});

// 加载路由
app.use('/database', require('./routers/database'));
app.use('/config', require('./routers/config'));
app.use('/service', require('./routers/service'));
app.use('/dreamersky', require('./routers/dreamersky'));
app.use('/imooc-shop', require('./routers/imooc-shop'));

// 定义错误页
app.use((req, res) => {
    res.status(404).json({'code': 404, 'msg': '页面无法找到'});
});

app.use((req, res) => {
    res.status(500).json({'code': 500, 'msg': '服务器错误'});
});

// 打开服务，监听端口
app.listen(8001, () => {
    // var host = server.address().address;
    // var port = server.address().port;

    console.log('App listening at http://127.0.0.1:8001');
    console.log(`当前环境为：${process.env.NODE_ENV === 'production' ? '产品' : '测试'}环境`);
});
