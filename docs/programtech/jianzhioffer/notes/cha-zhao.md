# 查找
## 整数中1出现的次数

**描述**

求出从1到n中，1出现的次数。

**示例**

```
输入：13
输出：6  // 1 10 11 12 13
```

**思路**

1. 最开始的想法

   首先遍历n个数字，把数字转为字符串，在每个字符串的字符，当遇到字符为1时，进行count++

2. 优化思路

   肯定是要遍历一遍从1到n的数字的，然而在判断每一位上的数字是否为1，可以不用转字符串的形式。要取数字的每一位，有个固定的思路，就是数值**n%10**，然后除以10后再取余，直到不满足循环条件。

**题解**

```javascript
let NumberOf1Between1AndN_Solution = function(n){
    // 设置计数器
    let count = 0
    // 遍历1~n的整数
    for(let i = 0;i<=n;i++){
        // 遍历每一个数值，比较各位上，是否为1
        for(let j = i; j>0;j=parseInt(j)/10){
            if(parseInt(j)%10 === 1){
               count++
            }
        }
    }
    return count
}
```

**大神思路**

将数值切分成低位（low）、高位（high）和当前值（cur）

根据cur的不同，分为三种情况计算1的个数：

1. cur = 0时，此位出现1的个数只与高位有关，计算公式为`high * digit`
2. cur = 1时，此位出现1的个数与高位和低位有关，计算公式为`high*digit+low+1`
3. cur > 1时，此位出现1的个数只与高位有关，计算公式为`(high+1)*digit`

初始值设置

​	当前位：cur = n%10

​	高位：high = high/10

​	低位：low = 0

​	位因子：digit = 1

​	计数器： count = 0

递推公式

​	当前位：cur = high%10

​	高位：high = high/10

​	低位：low = cur*digit+low

​	位因子：digit = digit*10

**题解**

```javascript
let NumberOf1Between1AndN_Solution = function(n){
    let cur = n%10,
        high = n/10,
        low = 0,
        digit = 1,
        count = 0
    while(high !== 0 || cur !== 0){
          if(cur === 0){
             count += high*digit
          }else if(cur === 1){
           	 count += high*digit+low+1
          }else{
             count += (high+1)*digit
          }
        low += cur*digit
        cur = high%10
        high /= 10
        digit *=10
    }
    return count
}
```

## 旋转数组中的最小数字

输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。

**示例**

```
输入：[3,4,5,1,2]
输出：1

输入：[1,1,1,0,1,1]
输出：0
```

**思路**

1. 最开始的想法

   采用Math.min函数，直接找数组中的最小值，由于Math.min接收的是一个参数列表，而题目给出的是一个数组，所以需要采用apply函数，来解决传参问题。

   ```javascript
   let minNumberInRotateArray = function(rotateArray){
       if(rotateArray === null || rotateArray.toString() === ""){
          return 0
       }
       return Math.min.apply(null, rotateArray)
   }
   ```

2. 采用变式的二分查找

   > 二分查找算法不限于运用在有序数组上。如果能够明确二分之后，答案存在于二分的某一侧，就可以使用二分查找

   对于一个非递减数组旋转后，前半部分的数值，均会大于等于后半部分，数组的最小值，一定会出现在数组中间。采用二分查找，当低位指针的值小于高位指针的值时，说明找到了最小值。

**题解**

```javascript
let minNumberInRotateArray = function(rotateArray){
    if(rotateArray === null || rotateArray.toString() === ""){
       return 0
    }
    let low = 0,
        high = rotateArray.length-1
    while(low<high){
        if(rotateArray[low]<rotateArray[high]){
            return rotateArray[low]
        }
        mid = (high+low)>>1
        if(rotateArray[low] < rotateArray[mid]){
           low = mid+1
        }else if(rotateArray[high] > rotateArray[mid]){
           high = mid
        }else{
            low++
        }
    }
    return rotateArray[low]
}
```

## 二维数组中的查找

在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**示例**

```
输入：[                               target = 7
        [1,3,5,6,7],
        [2,4,6,7,8],
        [5,6,8,9,10],
        [7,8,9,11,12],
        [9,10,11,13,15]
     ]
输出：true
```

**思路**

1. 最初的思路

   不管三七二十一，先来个双重循环，一个一个元素的比较，找到与target相等的值，返回true，未找到返回false。

2. 优化的思路

   可以观察到，由于二维数组中数值的递增特性，每一行中，最右侧的元素，是改行最大值，若这值比target小，说明该行都小于target，直接调到下一行。如果比target大，说明目标值可能在左侧，就将比较指针往左移动。知道找到目标值。

```javascript
let Find = function(target, array){
    if(array.length === 0 || !target){
       return false
    }
    let len = array.length
    let row = 0,
        col = len - 1
    while(row<len && col>=0){
          if(array[row][col] === target){
             return true
          }else if(array[row][col]<target){
             row++
          }else{
              col--
          }
    }
    return false
}
```