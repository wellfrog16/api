const handlePromise = (resolve, reject, err, docs) => {
    if (!err) {
        resolve(docs);
    } else {
        reject(err);
    }
}

module.exports = handlePromise;