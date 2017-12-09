function handleSend(res, err, docs) {
    if (err) {
        res.send({
            code: 500,
            msg: '数据库出错了~',
            data: err
        });
    }
    else {
        res.send({
            code: 200,
            msg: '',
            data: docs
        });
    }
}


module.exports = handleSend;