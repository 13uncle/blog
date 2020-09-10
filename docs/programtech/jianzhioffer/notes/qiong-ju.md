# 穷举
## 和为S的连续正整数序列

究竟有多少种连续的正数序列的和为S(至少包括两个数)。

**示例**

```javascript
输入：100
输出：[[9,10,11,12,13,14,15,16],[18,19,20,21,22],...]
```

**思路**

1. 最初的思路

   **双指针、滑动窗口**，通过滑动窗口内的数值和与目标值的大小判断，如何移动左右指针。

   当`sum=target`，将窗口内的值添加到数组中，然后将改组再添加到结果数组中；

   当`sum>target`，将左指针向右移动一位；

   当`sum<target`，将右指针向右移动一位。

   这里在边界判断处，可以做些优化，由于输出的是连续序列，而且至少有两个数，所以边界的话，就可以使用**`S/2`作为边界值**。

2. 暴力法

   直接遍历，然后逐个数字相加，当数字和等于目标值时，把这个子序列添加到结果数组中，如果数字和大于了目标值，那么起始数字向后移动一位，再重复上述相加工作。

**题解**

```javascript
let FindContinuousSequence = funciton(num){
    let res = []
    if(num<=0){
       return res
    }
    let pLeft = 1 // 左指针
    let pRight = 1 // 右指针
    let sum = 0
    while(pLeft <= num/2){
         if(sum<num){
            pRight++
            sum += pRight
         }else if(sum>num){
            sum -= pLeft
            pLeft++
         }else{
             let temp = []
             for(let i = pLeft;i<pRight;i++){
                 temp.push(i)
             }
             res.push(temp)
             sum -= pLeft
             pLeft++
         }
    }
    return res
}
```

## 丑数

把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含质因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。

**示例**

```
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
```

**思路**

1. 明确丑数的定义，首先，丑数是只包含2、3、5作为质因子的数，因此，任何一个丑数，都可以看作，某一丑数与2或3或5的乘积。每个判断条件都走一遍，是因为确保指针都要移动，比如丑数6，可以有2\*3计算得来，也可以由3\*2计算得来，这个两个产生6之后，p2和p3指针都要移动，否则可能出现，后面的数值，不递增产生。

```javascript
function GetUglyNumber(index){
    if(index<1){
       return -1
    }
    let p2 = 0
    let p3 = 0
    let p5 = 0
    let result = []
    result[0] = 1
    
    for(let i = 1;i<index;i++){
        result[i] = Math.min(result[p2]*2,result[p3]*3,result[p5]*5)
        if(result[i] === result[p2]*2){
           p2++
        }
        if(result[i] === result[p3]*3){
           p3++
        }
        if(result[i] === result[p5]*5){
           p5++
        }
    }
    return result[index-1]
}
```

