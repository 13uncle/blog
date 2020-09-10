# 排序
## 数据流中的中位数

如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。

**思路**

1. 最初的思路

   输入 --> 排序 --> 求值

```javascript
let stream = []
function Insert(num)
{
    stream.push(num)
    stream.sort(function(a,b){
        return a-b
    })
}
function GetMedian(){
    let len = stream.length
    return len%2 === 0 ? (stream[len/2]+stream[(len/2)-1])/2 : stream[(len-1)/2]
}
```

2. 优化思路

   在输入的时候，就对数组进行排序，构造好有序数组，这样在GetMedian()方法中直接返回中位数即可。

```javascript
let stream = []
function Insert(num)
{
    stream.push(num)
    for(let i =stream.length - 2;i>=0;i--){
        if(stream[i]>num){
            let temp = stream[i+1]
            stream[i+1] = stream[i]
            stream[i] = temp
        }
    }
}
function GetMedian(){
    let len = stream.length
    return len%2 === 0 ? (stream[len/2]+stream[(len/2)-1])/2 : stream[(len-1)/2]
}
```

3. 使用二分查找，确定num插入的位置

   在插入之前要先确定，元素插入的位置，然后把元素插入，构成排序好的数组。

```javascript
let stream = []
function Insert(num)
{
    let index = binarySearch(stream, num)
    stream.splice(index, 0, num)
}
function GetMedian(){
    let len = stream.length
    return len%2 === 0 ? (stream[len/2]+stream[(len/2)-1])/2 : stream[(len-1)/2]
}
function binarySearch(arr, target){
    let low = 0,
        high = arr.length - 1
    while(low<high){
        let mid = (low+high)>>1
        if(arr[mid] === target){
            return mid
        } else if(arr[mid]>target){
            high = mid - 1
        } else{
            low = mid + 1
        }
    }
    return low
}
```

**题解**

用两个堆完成，将数组拆分为两部分，左半部分用大顶堆，右半部分用小顶堆。