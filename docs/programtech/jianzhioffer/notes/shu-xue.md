# 数学

## 二进制中1的个数

输入一个整数，输出该数32位二进制表示中1的个数。其中负数用补码表示。

**示例**

```
输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
```

**思路**

1. 逐位判断是否为1，根据与运算有：

   n&1 = 1，最后一位为1；

   n&1 = 0，最后一位为0；

   所以根据以上计算，判断最后一位为1，进行计数，然后将数值向右移动一位，进行循环判断。

```javascript
let hamingWeight = funciton(n){
    let count = 0
    while(n !== 0){
    	if(n&1 === 1){
           count++
        }
        n >>>= 1
    }
    return count
}
```

2. 根据n&n-1判断

   n-1：会将二进制串中最右边第一个1变为0，该1后面的0都变为1

   n&n-1：会将上面操作位右边的所有1，变为0

   因此循环判断，进行了多少步操作，就有多少位1。

```javascript
let hamingWeight = funciton(n){
    let count = 0
    while(n){
    	n &= n-1
        count++
    }
    return count
}
```

## 数值的整数次方

实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。

**示例**

```
输入: 2.00000, 10
输出: 1024.00000
```

**思路**

1. 一看到这道题，求整数次方，首先想到现成儿的库函数，Math.pow(a,b)，a为底数，b为指数，可以直接求解幂运算。但是题目要求不能使用库函数，所以这种取巧方法不能使用。

   因此想到了，第二种取巧的方法。在ES6中新增了幂运算操作符(**)，如(a\*a = a\*\*2)。所以就有一下代码：

```javascript
var myPow = function(x,n){
    if(x === 0 && n!==0){
       return 0
    }else if(x !== 0 && n === 0){
       return 1
    }else if(x === 0 && n === 0){
       return
    }else{
        return n<0 ? (1\x)**-n : x**n
    }
}
```

2. 求幂运算可以简化为

- n为偶数：a^n = a^(n\2)*a^(n/2) = (a^2)^(n/2)
- n为奇数：a^n = a*a^(n/2)\*a^(n/2)

采用递归形式，基线条件为，指数n=0时，返回1，指数n=1时，返回底数。

```javascript
var myPow = function(x, n) {
    if(x === 0 && n === 0){
        return
    }
    var innerPow = function(base, exponent){
        if(exponent === 0){
            return 1
        }
        if(exponent === 1){
            return base
        }
        const res = innerPow(base, Math.floor(exponent/2))
        return exponent%2 ? base*res*res : res*res
    }
    const ret = innerPow(x,Math.abs(n))
    return n<0 ? 1/ret : ret
};
```

```javascript
var myPow = function(x, n) {
    if(x === 0 && n === 0){
        return
    }
    if(x === 0 && n !== 0){
        return 0
    }
    if(x !== 0 && n === 0){
        return 1
    }
    if(n<0){
        x = 1/x
        n = -n
    }
    // const isNegative = n < 0; // 是否是负指数
    // let absn = Math.abs(n);
    let result = 1;
    while (n) {
        // 如果n最右位是1，将当前x累乘到result
        if (n & 1) {
            result = result * x;
        }

        x = x * x; // x自乘法
        n = Math.floor(n/2); // n右移1位
    }

    return result
};
```

## 丑数

只包含质因子2,3,5的数称为丑数。

**示例**

```
输入：5
输出：6
解释：6 = 2*3
```

**思路**

新产生的可以看作，前面的丑数，乘以2或3或5，得到的结果，即总问题可以有小问题递推产生，所以可以使用动态规划来做。递推关系如何推导呢？由于要产生从小到大的序列，所以，产生的一项必是几个可能值中的最小值，而这几个可能的值又是什么呢？

错误的想法：这几个可能的值，是前一个丑数分别乘以2或3或5，得到的结果，这种想法明显错误，因为这里面的最小值必然是乘以2产生的。

正确的想法：分别维护乘以2乘以3乘以5后最小的那个丑数。

```javascript
var nthUglyNumber = function(n) {
    if(n<1){
        return -1
    }
    let p2 = 0,
        p3 = 0,
        p5 = 0
    let ret = []
    ret[0] = 1

    for(let i =1;i<n;i++){
        ret[i] = Math.min(ret[p2]*2,ret[p3]*3,ret[p5]*5)
        if(ret[i] === ret[p2]*2){ p2++ }
        if(ret[i] === ret[p3]*3){ p3++ }
        if(ret[i] === ret[p5]*5){ p5++ }
    }
    return ret[n-1]
};
```

## 求1+2+3+···+n

求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

**思路**

1. 既然不能用条件、循环等语句，那就直接求出数列公式，进行公式计算。

```javascript
var sumNums = function(n) {
    return (1+n)*n/2
};
```

2. 不能用循环，那可以使用递归啊，递归的本质就是while循环，管理一个调用栈。

```javascript
// 第一版自己写的,实际上res这个参数并没有在递归中返回
var sumNums = function(n){
	let res = 0
    let innerSum = function(n,s){
        s += n
        return n && n+innerSum(n-1, s)
    }
    return innerSum(n,res)
}

// 大神写的
var sumNums = function(n){
    return n && n + sumNums(n-1)
}
```

## 不用加减乘除做加法

写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。

**思路**

不能用操作符，那么剩下的只能是位运算了。

关于两个数相加，其实就是无进位和，加上进位的最终结果。因此只要分别计算这两个值即可。

那怎么得到无进位和进位的值呢，通过观察发现，无进位和就是对两个操作数进行异或运算，进位就是对两个操作数进行与运算，并需要左移一位。

当进位为0时，说明两操作数的和，就等于无进位和，直接返回即可。

```javascript
function Add(num1, num2)
{
    while(num2){
        let digit = (num1&num2)<<1
        num1 = num1 ^ num2
        num2 = digit
    }
    return num1
}
```

## 把字符串转为数值

将一个字符串转换成一个整数，要求不能使用字符串转换整数的库函数。 数值为0或者字符串不是一个合法的数值则返回0

**示例**

```
输入: "42"
输出: 42

输入: "   -42"
输出: -42
```

**思路**

1. 按照题目所描述的规则，进行分类讨论。
   - 取出字符前空格
   - 如果是+-号，返回带符号的连续整数
   - 如果是数值，返回最长的连续整数
   - 如果是非数值，直接返回0

```javascript
var strToInt = function(str) {
    let oStr = str.trim()
    let reg = /[0-9]/
    let res = ''
    let max = Math.pow(2,31)-1
    let min = (-1)*Math.pow(2,31)
    
    if(oStr[0]==='+' || oStr[0]==='-'){
        res += oStr[0]
        for(let i = 1;i<oStr.length;i++){
            if(reg.test(oStr[i])){
                res += oStr.charAt(i)
            }else{
                break
            }
        }

        let numRes = res * 1
        return res.length === 1 ? 0: (numRes >max ? max : numRes < min ? min : numRes)
    }
    if(reg.test(oStr[0])){
        let j = 0
        while(reg.test(oStr[j])){
            res += oStr.charAt(j)
            j++
        }
        return (res*1 > max ? max : res*1<min?min : res*1)
    }
        return 0
};
```

2. 使用正则，校验字符串

```javascript
var strToInt = function(str) {
    if(str.length === 0){
        return 0
    }
    let reg = new RegExp(/^\s*[\+-]?\d+/)
    let max = Math.pow(2,31)-1
    let min = (-1)*Math.pow(2,31)
    if(!str.match(reg)){
        return 0
    }
    let num = str.match(reg)[0].trim() - 0
    return num > max ? max : num < min ? min : num
};
```

