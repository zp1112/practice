process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){console.log(2);});
});
setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)

/**
 * 1
 * 2
 * TIMEOUT FIRED
 * process.nextTick永远在当前执行栈的尾部调用，在本次"事件循环"触发，不管嵌套多深，它指定的任务总是发生在所有异步任务之前
 */

setImmediate(function A() {
  console.log(1);
  setImmediate(function B(){console.log(2);});
});
setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)

/**
 * 1
 * TIMEOUT FIRED
 * 2
 * setImmediate永远在下一个执行栈的开始调用，在下次"事件循环"触发，一次"事件循环"只能触发一个由setImmediate指定的回调函数
 */

 
setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0)
new Promise((res, rej) => {
  console.log(222);
  res(333);
}).then(res => {
  console.log(res)
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0)
  new Promise((res, rej) => {
    console.log(444);
    res(555);
  }).then(res => {
    console.log(res)
  })
})

/**
 * 222
 * 333
 * 444
 * 555
 * TIMEOUT FIRED
 * TIMEOUT FIRED
 * 新增的微任务promise会在当前栈结束之前执行，因此promise里面新增的promise还是会在当前栈执行，而宏任务会依次加入到任务队列，
 * setTimeout会在下一次事件循环开始的时候执行
 */