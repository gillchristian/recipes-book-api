module.exports = {
  idNameHook: next => {
    if (!this.idName) {
      this.idName = JSON.parse(JSON.stringify(this.name.toLowerCase()));
      this.idName = this.idName.replace(/ /g, '-');
      this.idName = this.idName.replace(/\./g, '');
    }
    next();
  },
};
