function Condition(field1, operator, field2) {
    this.field1 = field1;
    this.operator = operator; // <, <=, ==, >, >=
    this.field2 = field2;
  }
Condition.prototype.type = "Condition";
  
  module.exports = Condition;
  