Array.prototype.page = function(page, pagesize) {
    const offset = (page - 1) * pagesize;
    return (offset + pagesize >= this.length) ? this.slice(offset, this.length) : this.slice(offset, offset + pagesize);
};