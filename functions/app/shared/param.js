function Param(key, name, value) {
    this.key = key;
    this.name = name;
    this.value = value;
  }
  
  Param.prototype.isVoid = () => {
      return (
          this.key === null | ''
          && this.name === null | ''
          && this.value === null | ''
      );
  } 
  
  module.exports = Param;