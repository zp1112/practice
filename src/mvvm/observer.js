export default function Observer(data) {
  this.data = data;
  this.walk(data);
}
const deps = [];
Observer.prototype = {
  walk: function(data) {
    for (const key of Object.keys(data)) {
      this.convert(key, data[key]);
    }
  },
  convert: function(key, val) {
    this.defineReactive(this.data, key, val);
  },
  defineReactive: function(data, key, val) {
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get: function() {
        // deps.push(callback);
        return val;
      },
      set: function(newVal) {
        if (newVal === val) return;
        // deps.forEach(func => func(newVal, val));
        val = newVal;
        // console.log(deps)
      }
    })
  }
}