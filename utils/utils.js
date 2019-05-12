const config = {
    debug: true
};

// 日志
const log = s => !config.debug || console.log(s);

// 发送结果操作
// 不使用http码，使用自定义的json来返回
const handle = {
    sendSuccess(res, data) {
        res.json({ code: 200, err: null, success: true, data });
    },
    sendError(res, err) {
        res.json({ code: 500, err, success: false, data: {} });
    }
};

// promise操作
const promise = {
    test(resolve, reject, err, docs) {
        err ? reject(err) : resolve(docs);
    },
    default(err, data) {
        return err ? promise.reject(err) : promise.resolve(data);
    },
    resolve(data) {
        return new Promise((resolve, reject) => promise.test(resolve, reject, null, data));
    },
    reject(err) {
        return new Promise((resolve, reject) => promise.test(resolve, reject, err, {}));
    }
};

module.exports = {
    log,
    handle,
    promise
};