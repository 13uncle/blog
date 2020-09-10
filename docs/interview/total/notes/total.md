# 面试题汇总
## 前端缓存机制

前端缓存可以分为强缓存和协商缓存，强缓存有两种方式：Expire和cache-control，协商缓存也有两种方式：last-modified和Etag。

### 强缓存

expires和cache-control都是在请求头部，对资源的缓存时间进行限制。强缓存中，用户的普通刷新会使用强缓存，强制刷新，请求回带上cache-control:no-cache和Programa:no-cache。

#### Expires

expires是http1.0的规范。它的值时一个绝对日期时间的GMT时间字符串。如果请求时间在这个时间之前，那么浏览器会从本地缓存中读取数据。

#### cache-control

cache-control是http1.1中的规范，主要通过max-age字段进行判断，max-age的值是一相对时间，代表缓存资源的有效期，当请求发送在有效期内，则使用缓存资源。cache-control有以下几个字段：

no-cache：不使用本地缓存，使用协商缓存

no-store：禁止浏览器进行缓存，用户每次请求都从新下载数据

public：可以被所有用户缓存，包括终端用户和代理服务器

private：只能被终端浏览器缓存

****

**Expires和cache-control同时存在时，cache-control（max-age）的优先级更高**

### 协商缓存

协商缓存由response Header中的Etag和Last-Modified进行标识。

etag会给每个文件，打上唯一标签，如果文件的内容发生了改变，那么etag会相应的进行更新

last-modified会记录文件的最后修改时间，如果文件内容没有变化，仅是更新了修改时间，也会重新缓存资源。

- 与etag对应的是if-none-match，这个if-none-match在request Header中被携带，其值与etag的值相同。
- 与last-modified对应的是if-modified-since，同样的在request Header中携带，值与last-modified相同。

#### 为什么要有Etag呢

如果值使用last-modified足够判断缓存是否有变动，那么为什么还要使用Etag呢？主要有以下三点：

- 一些文件可能会进行周期性修改，然而并不修改文件内容，只更新修改时间，我们并不希望这样的文件频繁被缓存。
- 某些文件修改非常频繁，修改时间间隔在秒级一下，last-modified的监测粒度是秒级的，所以无法检测到间隔小于秒级的文件修改。
- 某些服务器不能精确获得文件最后修改的时间。



## HTTP状态码

#### 200

请求成功

#### 204

无内容，服务器成功处理，但未返回内容

#### 300

多种选择，返回资源位置的列表，供用户端选择

#### 301

永久重定向

#### 302

临时重定向，资源只是临时移动

#### 304

未修改，客户端请求资源未修改，服务器不会返回资源，客户端根据缓存进行获取缓存数据。

#### 400

客户端请求语法错误，服务器无法处理

#### 403

客户端无权限访问服务器。服务器拒绝执行

#### 404

服务器无法找到请求的资源。

#### 500

服务器内部错误，无法处理请求

## new操作符做了哪些操作

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象
3. 执行构造函数，为新对象添加属性
4. 返回这个新对象

用一个函数来模拟new的操作

```javascript
function myNew (){
	// 首先创建一个对象
	var obj = new Object()
	// 获取到构造函数
	cons = [].shift.apply(arguments)
	// 由于new出来的实例，是可以访问原型对象的属性的
	obj.__proto__ = cons.prototype
	// 将构造函数的作用域赋值给新对象，并执行构造函数
	var ret = cons.apply(obj,arguments)// 考虑到构造函数有返回值得情况
	return typeof ret ==="object" ? ret : obj
}
```

## 数组扁平化的方法

数组扁平化，根据数组中所包含元素的类型不同，可以采用不同的方法。

- 如果仅扁平化数值数组，且数组中不含undefined、null、空位（，，），选择toString()和join()无疑是最方便的，方法。
- 如果数组中，包含对象、函数、undefined、null、空位（，，），选择递归、扩展运算符、reduce、方法都可以取得很好的效果。
- ES6的flat()方法，随便用。

```javascript
var arr = [1,[2,3,4,[5,6]],[],0]
var flat = function(arr){
	var res = []
	for(var i = 0;i<arr.length;i++){
		if(Array.isArray(arr[i])){
			res = res.concat(flat(arr[i]))
		}else{
            res.push(arr[i])
        }
	}
	return res
}
// var arr = [[],[1,2,"3",[undefined,null],function(){}],4,[[5,{a:"1",b:[7,8]}]]]
// [1, 2, "3", undefined, null, ƒ, 4, 5, {…}]
// 0: 1
// 1: 2
// 2: "3"
// 3: undefined
// 4: null
// 5: ƒ ()
// 6: 4
// 7: 5
// 8: {a: "1", b: Array(2)}


// 使用toString()、join()方法存在问题。并不能将含有undefined、null、函数、对象的数组正确扁平化
// var arr = [[],[1,2,"3",[undefined,null],function(){}],4,[[5,{a:"1",b:[7,8]}]]]
// 返回：["", "1", "2", "3", "", "", "function(){}", "4", "5", "[object Object]"]
function flat(arr){
    return arr.toString().split(",").map(item => +item)
}

function flat(arr){
    return arr.join().split(",").map(item => +item)
}

// ES6,参数为扁平化的层数
arr.flat(2)
arr.flat(Infinity)

// 扩展运算符
function flat(arr){
    var res = []
    while(arr.some(item => Array.isArray(item))){
          res = [].concat(...arr)
    }
    return res
}

// reduce
function flat(arr){
    var ret = []
    ret = arr.reduce(function(a,b){
        return a.concat(Array.isArray(b):flat(b):b)
    },[])
    return ret
}

// 正则，就不写了，限制比较大
```



## EventLoop

javascript是单线程语言，所有任务都在一个线程上完成。这就造成了如果任务过于耗时，将会产生浏览器假死状态。为了解决这一问题，提出了“EventLoop”解决方案。

EventLoop解决方案，通过设置一个单独的线程，来管理任务队列。

这个“线程”会管理**宏队列**和**微队列**，这两个待执行任务队列，会按照*规则*，添加到主线程上的任务执行队列中。

### 宏队列（macrotask）

一些异步任务回调被称为**宏任务**，宏任务会被添加到宏队列中，等待后续被调用，宏任务包括：

- setTimeout
- setInterval
- rAF
- I/O
- UI rendering

### 微队列（microtask）

一些异步任务被称为**微任务**，微任务会被添加到微队列中，等待后续被调用，微任务包括：

**主要就是Promise**

- Promise
- process.nextTick(Node)
- Object.observe
- MutationObserver

### 规则

上面提到，不管是同步任务还是异步任务，会按照某种规则添加到任务队列中并执行。规则如下：

1. 执行全局的同步代码，在执行过程中，遇到微任务就将其加入到微队列中，遇到宏任务就加入到宏队列中。
2. 执行全局同步代码后，主线程执行任务队列为空。
3. 将所有微队列中的任务添加到主线程的执行任务队列中，依次执行，直到所有微任务执行完毕，微队列为空，主线程执行队列也为空。**注意**：当执行某个微任务的时候，如果又产生了宏任务或者**微任务（会添加到当前执行的微任务队列队尾，在本轮执行）**，需要将该任务，添加到相应的队列中，等待执行。
4. 执行完所有的微任务后，微任务队列为空，主线程执行队列也为空。
5. 取出宏队列队头的任务，添加到主线程执行任务队列中，如果该任务执行过程中，又产生了，宏任务或者微任务，需要添加到相应的队列中，等待执行。
6. 执行完毕后，主线程任务队列为空。
7. 重复第3--6步骤。

**注意事项**

- 宏队列一次只会取出一个任务来执行，执行完毕之后，会去检查微任务队列，如果不为空，那么会执行微任务队列中的任务。
- 当进行到微任务队列执行时，会一次性执行完所有微任务，包括在微任务执行过程中产生的新的微任务。
- UI rendering执行节点，是在所有微任务执行完毕之后，下一个宏任务执行之前。



## BFC

Block Formatting Context，块级格式化上下文。它是一个独立的渲染区域，它按照一定的*规则*进行块内部元素的渲染，内部的渲染不会影响外部元素，同样，一个BFC外部的元素，也不会影响其内部元素的渲染。

### BFC的布局规则

正是由于存在以下布局规则，所以才会存在边距重叠等问题，也正是由于以下规则，才会解决高度塌陷的问题。

1. BFC内部的块级元素，会占据文档流的一整行，即会贴合父级元素左边缘垂直排列。
2. 内部的BOX元素的垂直间距由margin决定，**同一BFC中的两个BOX会发生垂直边距重叠**。当内部元素设置浮动属性后，左右边距不会重叠。
3. BFC区域不会与float元素发生重叠。
4. BFC是页面上独立的渲染区域，不会与其外部元素发生影响。
5. 计算BFC高度的时候，浮动元素也会参与计算。

### 产生一个BFC

1. float的值不为none
2. position的值不为static或者relative
3. display的值inline-block、table-cell、flex、inline-flex
4. overflow的值不会visible

