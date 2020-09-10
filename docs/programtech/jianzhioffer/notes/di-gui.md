# 递归
## 跳台阶

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

**示例**

```
输入：3
输出：3 // 111,12,21
```

**思路**

最终要跳上n级台阶，不能跳过了。。所以到达第n级台阶的方法有，跳1级到达或者跳2级到达。还记得高中学过的**分类相加，分步相乘**，这属于构成一个总的集合，进行了分类讨论，所以要将这两种方式所采用的方法加起来。

用`f(n)`表示到达第n级台阶的跳法总数，所以有递推关系`f(n)=f(n-1)+f(n-2)`

当`n<3`时，`f(n)=1`

**题解**

```javascript
let jumpFloor = funciton(number){
    if(mumber < 3){
       return number
    }
    return jumpFloor(number-1)+jumpFloor(number-2)
}
```

**优化**

很明显这是斐波那契数列，关于斐波那契数列的优化算法，有很多种，主要思想就是将计算过的值保存起来，减少重复计算。

```javascript
// 用两个变量保存
function fibonacci(n){
    if(n <= 2){
        return n;
    }
    let pre1 = 1,
        pre2 = 2
    for(let i = 3;i<=n;i++){
        let cur = pre1 + pre2
        pre1 = pre2
        pre2 = cur        
    }
    return pre2
}
```

```javascript
// 用一个变量保存
function fibonacci(n){
    if(n<=2){
        return n
     }
    let pre = 1
    let cur = 2
    for(let i = 3;i<=n;i++){
        cur = cur + pre
        pre = cur - pre
    }
    return cur
}
```

## 矩形覆盖

我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

比如n=3时，2*3的矩形块有3种覆盖方法：

![img](https://uploadfiles.nowcoder.com/images/20200218/6384065_1581999858239_64E40A35BE277D7E7C87D4DCF588BE84)

**思路**

这个和跳台阶的思路是一模一样的，要想最后填充完整大矩形，那么最后只可能有两种方式填充

一种是：![img](F:\学校-研究生\学习资料\jianzhioffer\md\矩形覆盖1.jpg)



另一种是：![img](F:\学校-研究生\学习资料\jianzhioffer\md\矩形覆盖2.jpg)

所以覆盖大矩形的方法就有`f(n)=f(n-1)+f(n-2)`

**题解**

```javascript
let rectCover = function(n){
    if(n<=2){
       return n
    }
    let pre = 1
    let cur = 2
    for(let i = 3;i<=n;i++){
        cur = cur + pre
        pre = cur - pre
    }
    return cur
}
```

## 斐波那契数列

**非递归**

```javascript
let Fibonacci = function(n){
    if(n>=0 && n<=1){
       return n
    }
    let sum = 1
    let pre = 0
    for(let i = 0;i<=n;i++){
        sum = sum + pre
        pre = sum - pre
    }
    return sum
}
```

**递归**

```javascript
let Fibonacci = function(n){
    if(n<2 && n>=0){
       return n
    }
    return Fibonacci(n-1)+Fibonacci(n-2)
}
```

