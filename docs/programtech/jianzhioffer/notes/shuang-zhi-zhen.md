# 双指针

## 链表中倒数第K个节点

输入一个链表，输出该链表中倒数第k个结点。

**示例**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

**思路**

1. 要返回倒数第K个节点，由数学关系可知，如果链表长度为L，则倒数第K个节点为：正数第`L-K+1`个节点，基本想法就是，遍历两遍链表
   - 第一次遍历整个链表，记录链表长度
   - 第二次遍历，返回第`L-K+1`个节点

```javascript
var getKthFromEnd = function(head,k){
	if(!head || k<1){
       return null
    }
    let num = 0
    let cur = head
    while(cur){
         num++
        cur = cur.next
    }
    if(k > num){
       return null
    }
    for(let i = 1,len = num-k+1;i<len;i++){
        head = head.next
    }
    return head
}
```

2. 双指针-快慢指针法，倒数第K个节点总是和最后一个节点相差`k-1`个距离（k-1步），所以可以让快指针先走`k-1`步，然后快慢指针同步往后走，当快指针到达链表末尾时，慢指针即指向倒数第k个节点。

```javascript
var getKthFromEnd = function(head,k){
    if(!head || k<1){
       return null
    }
    let fast = head
    let slow = head
    for(let i = 1;i<k;i++){
        if(fast === null){
           return null
        }
        fast = fast.next
    }
    while(fast.next){
        slow = slow.next
        fast = fast.next
    }
    return slow
}
```

3. 双指针法还可以在代码上优化，可以采用一次循环，同时走两个指针。

```javascript
var getKthFromEnd = function(head,k){
    if(!head || k<1){
       return null
    }
    let fast = head,
        slow = head
    let num = 0
    while(fast.next){
        if(num >=k-1){
         	slow = slow.next  
        }
        fast = fast.next
        num++
    }
    return slow
}
```

## 和为S的两个数字

输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。

**示例**

```
输入：nums = [2,7,11,15], target = 9
输出：[2,7] 或者 [7,2]
```

**思路**

1. 对于有序数组，求满足某一条件的值时，通常采用双指针法，从数组的两端进行遍历。该题采用这种方法
   - 当`sum=target`时，输出满足条件的两个数
   - 当`sum<target`时，小指针右移，增大数字
   - 当`sum>target`时，大指针左移，减小数字

```javascript
var twoSum = function(nums, target) {
    if(nums.length === 0 || nums.length === 1){
        return []
    }
    let low = 0
    let high = nums.length - 1
    while(low<high){
        let sum = nums[low] + nums[high]
        if(sum === target){
            return [nums[low], nums[high]]
        }else if(sum < target){
            low++
        }else{
            high--
        }
    }
    return []
};
```

## 滑动窗口的最大值

给定一个数组 `nums` 和滑动窗口的大小 `k`，请找出所有滑动窗口里的最大值。

**示例**

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7]
```

**思路**

1. 由于滑动窗口大小是确定的，所以可以使用一个指针来表示窗口的两个端点。然后求窗口数组的最大值，添加到结果数组中。

```javascript
var maxSlidingWindow = function(nums, k) {
    if(nums.length === 0){
        return []
    }
    let ret = []
    for(let i = 0;i<=nums.length - k;i++){
    	let clipNums = nums.slice(i,i+k) // slice()参数左闭右开
    	let max = Math.max.apply(null,clipNums)
    	ret.push(max)
    }
    return ret
}
```

2. 采用真正的双指针，两个指针分别指向滑动窗口的两端，同时向后移动，计算窗口内最大值。

```javascript
var maxSlidingWindow = function(nums,k){
    if(nums.length === 0){
       return []
    }
    let low = 0,
        high = k-1
    let ret = []
    while(high<nums.length){
        let max = Number.MIN_VALUE
        for(let i = low;i<=high;i++){
            if(nums[i] > max){
               max = nums[i]
            }
        }
        ret.push(max)
        low++
        high++
    }
    return ret
}
```



## 数组中数字出现的次数

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

```javascript
var singleNumbers = function(nums) {
    if(nums.length === 0 || nums.length === 1){
        return nums
    }
    nums.sort((a,b)=>a-b)
    let pre = 1
    let last = 0
    while(last < nums.length){
        if(nums[pre] === nums[last]){
            pre += 2
            last += 2
        }else{
            res.push(nums[last])
            last++
            pre++
        }
    }
    return res
};
```