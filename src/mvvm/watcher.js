// import Observer from './observer';

const data = {
  key: 1,
  value: {
    key: 4
  }
};
let target = null;

function Observer(data) {
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
    let childObj = observe(val);
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get: function() {
        if (target) {
          deps.push(target);
        }
        return val;
      },
      set: function(newVal) {
        if (newVal === val) return;
        val = newVal;
        console.log(999, newVal)
        childObj = observe(newVal);
        deps.forEach(target => target.update());
      }
    })
  }
}
function observe(value) {
  if (!value || typeof value !== 'object') {
      return;
  }
  return new Observer(value);
};


const a = observe(data);
function watcher(vm, exp, cb) {
  this.cb = cb;
  this.exp = exp;
  this.vm = vm;
  this.value = this.get();
}
watcher.prototype = {
  update: function() {
    this.run();
  },
  run: function() {
      const value = this.get();
      var oldVal = this.value;
      if (value !== oldVal) {
          this.value = value;
          this.cb.call(this, value, oldVal);
      }
  },
  get: function() {
    target = this;
    const val = this.parseGetter(this.exp).call(this, this.vm);
    target = null;
    return val;
  },
  parseGetter: function(exp) {
    if (/[^\w.$]/.test(exp)) return; 
    var exps = exp.split('.');
    return function(obj) {
        for (var i = 0, len = exps.length; i < len; i++) {
            if (!obj) return;
            obj = obj[exps[i]];
        }
        return obj;
    }
  }
}
function callback(val, oldVal) {
  console.log(val, oldVal);
}
const watch = new watcher(data, 'key', callback);
data.key = 111;
// const watch2 = new watcher(data, 'value.key', callback);
// a.data.value.key = 444;
// const watch3 = new watcher(data, 'value', callback);
// a.data.value = {
//   aa: 222
// };
