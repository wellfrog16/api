function handleSend(res, err, docs) {
    if (err) {
        res.json({
            code: 500,
            msg: '数据库出错了~',
            data: err
        });
    } else {
        res.json({
            code: 200,
            msg: '',
            data: docs
        });
    }
}

module.exports = handleSend;