function Person(name) {
  this.name = name;
}
function Person1(name) {
  this.super(name)
  // Person.call(this, name);
}
// Person1.prototype = Object.create(Person.prototype, {
//   constructor: {
//     value: Person1,
//     enumerable: false,
//     writable: true,
//     configurable: true
//   },
//   super: {
//     value: Person,
//     enumerable: false,
//     writable: true,
//     configurable: true
//   }
// })
Person1.prototype = Object.assign(Person.prototype, {
  constructor: Person1,
  super: Person,
})
// Person1.prototype.super = Person;
let person1 = new Person1('candy');
console.log(person1.name);