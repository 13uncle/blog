# 位运算

## 数组中只出现一次的数字

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

**示例**

```
输入：nums = [4,1,4,6]
输出：[1,6] 或 [6,1]
```

**思路**

1. 最初的思路，计数，通过记录每个值在数组中出现的次数，最后返回记录次数为1的值。
2. 两个数字只出现一次，其余数字都出现了两次，可以通过indexOf和lastIndexOf来判断
   - 当使用indexOf和lastIndexOf寻找一个值时，找到的下标相等，说明这个值在数组中只出现了一次
   - 当返回的下标不相等时，说明这个值在数组中不唯一

```javascript
var singleNumbers = function(nums){
	if(nums.length === 0 || nums.length === 1){
       return nums
    }
    let res = []
    for(let num of nums){
        if(nums.indexOf(num) === nums.lastIndexOf(num)){
           res.push(num)
        }
    }
    return res
}
```

3. 双指针法，维护前后两个指针，需要先对数组进行排序，相同的值会集中在一起
   - 当两个指针指向的数值相同时，两个指针同时向后走两个单位
   - 当两个指针指向的数值不同时，返回后面指针的值，并且两个指针同时向后走一个单位

```javascript
var singleNumbers = function(nums){
	if(nums.length === 0 || nums.length === 1){
       return nums
    }
    let i = 0,
        j = 1
    let res = []
    nums.sort((a,b)=>a-b)
    while(i < nums.length){
         if(nums[i] === nums[j]){
             i+=2
             j+=2
         }else{
             res.push(nums[i])
             i++
             j++
         }
    }
    return res
}
```

4. 前两种方法都不能保证，空间复杂度为O(1)，采用位运算性质可以达到要求。

   首先我们清楚当两个相同的值进行异或运算时，其结果为0；当两个不同的值进行异或运算时，在数字的二进制位上会产生1。

   然后我们就产生一个想法，把数组中的值进行迭代异或，最后剩下那个数字就是我们想要的，然而，这只适用于数组中只有一个出现一次的数字。

   我们现有数组是包含两个出现一次的数字，所以现在的目标是

   - 把这两个出现一次的数字，放到两个数组中
   - 把其他相同的数字成对的分成两组

   通过一个方法可以同时达到上面两个目标，设两个出现一次的值分别为a,b，数组迭代异或之后值为a^b，找到这个值右侧第一个不为0的位置

   - 相同数值异或这个值，肯定会被分到一起
   - 出现一次的值也可以通过这个值分到不同的组

```javascript
var singleNumbers = function(numbers){
	if(nums.length === 0 || nums.length === 1){
       return nums
    }
    // 首先迭代异或每一个值
    let k = 0
    for(let num of nums){
        k ^= num
    }
    let mask = 1
    // 找到第一个不为0的位置
    while((k&mask) === 0){
          mask <<= 1
    }
    let a = 0
    let b = 0
    for(let num of nums){
        if(num&mask === 0){
           a ^= num
        }else{
            b ^= num
        }
    }
    return [a,b]
}
```

