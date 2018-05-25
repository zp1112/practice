function Person(name) {
  this.name = name;
}
function Person1(name) {
  this.super(name)
  // Person.call(this, name);
}
Person1.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Person1,
    enumerable: false,
    writable: true,
    configurable: true
  }
}, { super: Person })
console.log(111, Person1)
// Person1.prototype.super = Person;
let person1 = new Person1('candy');
console.log(person1.name);