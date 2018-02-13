const handleSend = (res, err, docs) => {
    if (err) {
        res.json({
            code: 500,
            msg: '出错了~',
            data: err
        });
    } else {
        res.json({
            code: 200,
            msg: '',
            data: docs
        });
    }
};

const handlePromise = (resolve, reject, err, docs) => {
    if (!err) {
        resolve(docs);
    } else {
        reject(err);
    }
};

module.exports = {
    handleSend,
    handlePromise
};