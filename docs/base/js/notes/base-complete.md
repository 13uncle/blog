# 基础实现
## call

**例子**

```javascript
var obj = {
    value: 1
}
function exam(){
    console.log(this.value)
}
exam.call(obj) // 1
```

**注意**

1. call改变了this的指向，指向到obj
2. exam函数执行了

**思路**

1. 将函数设置为绑定上下文对象的属性
2. 执行函数
3. 删除属性

```javascript
obj.fn = exam

obj.fn()

delete obj.fn
```

### 第一版

简单调用

```javascript
Function.prototype.myCall = function(context){
	context.fn = this
    context.fn()
    delete context.fn
}
```

### 第二版

传入参数

````javascript
Function.prototype.myCall = function(context){
    let args = []
    context.fn = this
    for(let i = 1;i<arguments.length;i++){
        args.push('arguments['+i+']')
    }
    eval('context.fn('+args+')') // args会调用toString()方法
    delete context.fn
}
````

### 第三版

具有返回值

```javascript
Function.prototype.myCall = function(context){
    context.fn = this
    let args = []
    for(let i =1;i<arguments.length;i++){
        args.push('arguments['+i+']')
    }
    let res = eval('context.fn('+args+')')
    delete context.fn
    return res
}
```

## apply

apply和call的区别就是，传入的参数是一个数组，会将参数数组作为参数列表，传递给函数

```javascript
Function.prototype.myApply = function(context,arr){
    context.fn = this
    let args = []
    for(let i = 0;i<arr.length;i++){
        args.push('arr['+i+']')
    }

    let res = eval('context.fn('+args+')')
    delete context.fn
    return res
}
var obj = {
    value: 1
}
function exam (name,age){
    return {
        name,
        age,
        value:this.value
    }
}
console.log(exam.myApply(obj,["name", 18]))
```

```javascript
Function.prototype.apply2 = function(context,arr){
	// 确定上下文
	var context = context || window // 当传入null的时候只想window
	context.fn = this // 把函数绑定为属性
	
	var ret = null
	
	if(!arr){
	// 执行函数
		ret = context.fn()
	}else{
	    var args = []
        for(var i =1;i<arr.length;i++){
            args.push("arguments["+i+"]")
        }
		ret = eval("context.fn("+args+")")
	}
	// 删除属性
	delete context.fn
	return ret
}
```

## bind

> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

1. 返回一个函数
2. 可以传入参数

### 第一版

返回函数

```javascript
Function.prototype.myBind = function(context){
     let self = this
     return function(){
         return self.apply(context)
     }
}
```

### 第二版

传入参数

```javascript
Function.prototype.myBind = function(context){
    let self = this
    let outArgs = Array.prototype.slice.call(arguments, 1)
	return function(){
		let args = Array.prototype.slice.call(arguments)
		return self.apply(context,args.concat(outArgs))
	}
}
```

### 第三版

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

把bind返回的函数作为构造函数，bind指定的this会失效，但是传递的参数依然有效。

```javascript
Function.prototype.myBind = function(context){
    let self = this
    let outArgs = Array.prototype.slice.call(arguments, 1)
    let fbind = function(){
        let bindArgs = Array.prototype.slice.call(arguments)
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fbind ? this : context, outArgs.concat(bindArgs))
    }
    fbind.prototype = this.prototype
    return fbind
}
```

### 第四版

调用bind的不是函数

```javascript
Function.prototype.myBind = function(context){
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    let self = this
    let outArgs = Array.prototype.slice.call(arguments, 1)
    let tmpfn = function (){}
    let fbind = function(){
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof tmpfn ? this : context, outArgs.concat(bindArgs))
    }
    tmpfn.prototype = this.prototype
    fbind.prototype = new tmpfn()
    return fbind
}
```

## new

使用new操作符会经历一下操作：

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象（this的指向变成了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

用一个createObj()函数，模拟new操作符的操作

```javascript
function createObj (){
    let obj = new Object()
    let constr = [].shift.call(arguments)
    obj.__proto__ = constr.prototype
    constr.apply(obj,arguments)
    return obj
}
```

```javascript
function Sub(name, age){
    this.name = name
    this.age = age
}
Sub.prototype.sayname = function(){
	console.log(this.name)
}
var ret = createObj(Sub,"nname",18)
ret.sayname()
console.log("ret===========", ret)
```

### 第二版

构造函数具有返回值

```javascript
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

};
```
## 数组扁平化
在面试题汇总模块有比较详细的总结，记得要拿过来
### 递归
```javascript
function flat(arr){
    let ret = []
    for(let i = 0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
           ret = ret.concat(flat(arr[i]))
        }else{
            ret.push(arr[i])
        }
    }
    return ret
}
```

### toString

```javascript
function flat(arr){
    let ret
    ret = arr.toString().split(",").map(item => +item)
    return ret
}
```

如果传入的数组为`[1,'2',[2,[3,4]],[[],8],['1']]`里面的空数组将会被toString()方法转为空（4，，8），在使用split()方法时，该空位置会被转为空字符串，并且在转换为数值时，会被转为0。因此该方法存在局限性。

### join

```javascript
function flat(){
	let ret
    ret = arr.join(',').split(',').map(item => +item)
    return ret
}
```

### reduce

```javascript
function flat(){
    let ret
    ret = arr.reduce((a,b)=>{
        return b.concat(Array.isArray(a)?flat(a):a)
    },[])
}
```

### ...(扩展运算符)

```javascript
function flat(arr){
    while(arr.some(item => Array.isArray(item))){
          arr = [].concat(...arr)
    }
    return arr
}
```
## 数组交并差
### includes

**并集**

```javascript
ret = a.concat(b.filter(item => !a.includes(item)))
```

**交集**

```javascript
ret = a.filter(item => b.includes(item))
```

**差集**

```javascript
ret = a.concat(b).filter(item => !a.includes(item) || !b.includes(item))
```

### Set

**并集**

```javascript
ret = Array.from(new Set(a.concat(b))) 或者 [...new Set(a.concat(b))]
```

**交集**

```javascript
ret = Array.from(new Set(a.filter(item => b.has(item))))
```

**差集**

```javascript
ret = [...new Set(a.concat(b).filter(item => !a.has(item) || !b.has(item)))]
```

### indexOf

**并集**

```javascript
ret = a.concat(b.filter(item => a.indexOf(item) === -1))
```

**交集**

```javascript
ret = a.filter(item => b.indexOf(item) > -1)
```

**差集**

```javascript
ret = a.filter(item => b.indexOf(item) === -1).concat(b.filter(item => a.indexOf(item) === -1))
```

## 函数防抖

触发事件n秒后，执行一次函数。如果在n秒内重复触发，则从新计时，待n秒后执行函数。（一直触发，函数不会执行，停止触发后n秒执行）

```javascript
function debounce(fn,wait){
    let timeout; // 设置定时器
    return function(){
        let context = this // 保存fn的执行上下文
        let args = arguments // 传入的参数
        
        // 如果存在定时器，说明在n秒内，在重复触发，需要清空定时器，从新计时
        if(timeout){
        	clearTimeout(timeout)
        }
        
        // 设置定时器，在n秒后执行函数
        timeout = setTimeout(function(){
            fn.apply(context, args)
        },wait)
    }
}
```

```javascript
function debounce(fn, wait){
    let timeout; // 设置定时器
    return function(){
        let context = this
        let args = arguments
        if(timeout){
           clearTimeout(timeout)
        }
        
        // 首次触发，立即执行判断
        let callNow = !timeout
        
        // 在n秒内多次触发，重新计时
        timeout = setTimeout(function(){
            timeout = null
        },wait)
        
        // 触发立即执行
        if(callNow){
           fn.apply(context, args)
        }
    }
}
```

## 函数节流

在一个时间周期内，函数只执行一次。（一直触发，函数会按周期时间执行）

```javascript
function throttle(fn, wait){
    let context, args
    let previous = 0
    
    return function(){
        let now = new Date() // 当前时间戳
        context = this
        args = arguments
        
        // 当触发间隔大于设置的触发周期时，执行函数，并将当前时间赋值给previous
        // 保证了在重复触发的情况下，函数会按周期，一直执行
        if(now - previous > wait){
           fn.apply(context, args)
            previous = now
        }
    }
}
```

```javascript
function throttle(fn, wait){
    let timeout
    return function(){
        let context = this
        let args = arguments
        // 节流的定时器实现，就是防抖函数，不在外部清空定时器，当定时器执行时，自动清空定时器。
        if(!timeout){
           timeout = setTimeout(function(){
               timeout = null
               fn.apply(context, args)
           },wait)
        }
    }
}
```

