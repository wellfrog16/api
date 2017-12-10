function handleSend(res, err, docs) {
    if (err) {
        res.json({
            status: 0,
            code: 500,
            msg: '数据库出错了~',
            data: err
        });
    }
    else {
        res.json({
            status: 1,
            code: 200,
            msg: '',
            data: docs
        });
    }
}


module.exports = handleSend;