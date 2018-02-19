module.exports = (req, res, next) => {
    const path = req.path;
    const method = req.method.toLowerCase();

    // console.log(req.path);
    // console.log(req.method);
    // console.log(req.originalUrl);

    // imooc-shop项目拦截
    if (/^\/imooc-shop\/.+/g.test(path)) {
        // 已登陆，cookie登陆
        if (req.signedCookies.user || method === 'options') {
            next();
        } else {
            // 白名单，未登录可访问
            const whiteList = [
                {path: /\/imooc-shop\/user\/login/, method: 'post'},
                {path: /\/imooc-shop\/user\/check-login/, method: 'get'},
                {path: /\/imooc-shop\/goods/, method: 'get'},
                {path: /\/imooc-shop\/goods\/\d+/, method: 'get'}
            ];

            let pass = false;
            for (const white of whiteList) {
                if (white.path.test(path) && white.method === method) {
                    pass = true;
                    break;
                }
            }

            if (pass) {
                next();
            } else {
                // 白名单未next，返回没有权限
                res.json({ code: 401, err: '没有权限', data: {} });
            }
        }
    } else {
        next();
    }
};