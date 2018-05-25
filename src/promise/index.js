function MyPromise(fn) {
  const callbacks = [];
  let value = null;
  let state = 'pending';
  this.then = function(callback) {
    return new MyPromise(resolve => {
      if (state === 'pending') {
        callbacks.push({
          callback,
          resolve
        });
        return;
      } else if (state === 'fulfilled') {
        resolve(callback(value));
        return;
      }
    })
  }
  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve);
        return;
      }
    }
    state = 'fulfilled';
    value = newValue;
    setTimeout(() => {
      callbacks.forEach(function (callback) {
        callback.resolve(callback.callback ? callback.callback(value) : value);
      })
    }, 0);
  }
  fn(resolve);
}

// const p1 = new MyPromise(resolve => setTimeout(() => resolve(111), 1000)).then(data => console.log(data));
// setTimeout(() => p1.then(data => console.log(data)), 0)
// const p2 = new MyPromise(resolve => resolve(111)).then(data => console.log(data));
// setTimeout(() => p2.then(data => console.log(data)), 0)
// const p3 = new MyPromise(resolve => setTimeout(() => resolve(111), 1000)).then(data => {
//   console.log(data) 
//   return new MyPromise(resolve => setTimeout(() => resolve(222), 1000))
// })
// .then().then(data => {
//   console.log(data) 
//   return new MyPromise(resolve => resolve(333)).then(data1 => {
//     console.log(data1)
//   })
// });

// new MyPromise(resolve => setTimeout(() => resolve(111), 1000))
//     .then(getUserJobById)
//     .then(function (job) {
//         // 对job的处理
//         console.log(job)
//     });

// function getUserJobById(id) {
//     return new Promise(function (resolve) {
//       resolve(222)
//       // setTimeout(() => resolve(222), 1000)
//     });
// }

function parent(){
  var pname = "private";//私有属性
  var pfun = function(){//私有方法
  console.log("调用类的私有方法");
  }
  this.getName=function(name){//公有方法
  this.name = name;//公有属性
  return pname+"私有属性+公有属性"+this.name+"调用类的共有方法";
  }
  }
  //定义静态属性及方法
  parent.staticPro = "static property";
  parent.staticFun = function(){
  var str = "invoke class's static function";
  return str;
  }
  //方法1  原型链继承
  function childOne(){};
  childOne.prototype = new parent();
  const a = new childOne();
  console.log(a)
  a.getName('ss')
  console.log(a.name)