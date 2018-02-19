const handleSend = (res, err, data) => {
    if (err) {
        res.json({ code: 500, err: err, data: {} });
    } else {
        res.json({ code: 200, err: null, data });
    }
};

const handlePromise = (resolve, reject, err, docs) => {
    if (!err) {
        resolve(docs);
    } else {
        reject(err);
    }
};

const handleError = err => new Promise((resolve, reject) => handlePromise(resolve, reject, err, {}));

module.exports = {
    handleSend,
    handlePromise,
    handleError
};