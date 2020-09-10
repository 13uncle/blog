# 二分法

## 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序(非递减)的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

**示例**

```
输入：[3,4,5,1,2]
输出：1
```

**思路**

1. 非递减数组经过旋转后，可以划分为两个区间，前面区间中的数字，一定大于等于后面区间中的数字，最小值在两个区间之间产生。
   - `nums[mid]<nums[high]`时，表明指针high右侧的值都比nums[high]大，`high=mid`
   - `nums[mid]>nums[high]`时，表明指针mid左侧的值都比最小值大，最小值将会出现在右侧`low=mi+1`
   - `nums[mid]=nums[high]`时，此时由于数组可能存在重复元素，而不能确定最小值位置，所以一步一步移动high指针，直到找到最小值，`high--`

```javascript
var minArray = function(numbers) {
    if(numbers.length === 0){
        return null
    }
    let low = 0
    let high = numbers.length - 1

    while(low < high){
        let mid = low+(high - low)/2
        if(numbers[low]<numbers[high]){
            return numbers[low]
        }
        if(numbers[low] < numbers[mid]){
            low = mid + 1
        }else if(numbers[low] > numbers[mid]){
            high = mid
        }else{
            low++
        }
    }
    return numbers[low]
};


var minArray = function(numbers) {
    let low = 0
    let high = numbers.length - 1

    while(low < high){
        //一定要向下取整
        let mid = Math.floor(low+(high - low)/2) 
        if(numbers[mid] < numbers[high]){
            high = mid
        }else if(numbers[mid] > numbers[high]){
            low = mid + 1
        }else{
            high--
        }
    }
    return numbers[low]
};
```

## 数字在升序数组中出现的次数

统计一个数字在升序数组中出现的次数。

**示例**

```
输入：[1,2,2,3,4,4,4,5,5],4
输出：3
```

**思路**

1. 我们知道二分法可以在排序数组中查找到目标值，并返回其下标，本题同样是在排序数组中找到目标值，不同的是，我们需要找到第一次出现该值和最后一次出现该值得位置。

   难点在于，对于指针移动的判断

   - 当查找下索引时，high指针等于目标值时，也需要继续向下移动，返回low指针
   - 当查找上索引时，low指针等于目标值时，也需要继续向上移动，返回low指针，这里有一个需要注意的点，那就是当low=high时，还会再移动一次low指针，所以计算两个索引的差值，就是重复数字的次数。

```javascript
function GetNumberOfK(data, k)
{
    if(data.length === 0 || k > data[data.length-1] || k<data[0]){
        return 0;
    }
    var low = lowerIndex(data,k);
    var high = upperIndex(data,k);
    return high - low;
    
}
function lowerIndex(arr,k){
    var low = 0,
        high = arr.length-1;
    
    while(low<=high){
        var mid = (low+high) >> 1;
        if(arr[mid]<k){
            low = mid + 1;
        }else{
            high = mid - 1;
        }
    }
    return low;
}
function upperIndex(arr,k){
    var low = 0,
        high = arr.length-1;
    
    while(low<=high){
        var mid = (low+high) >> 1;
        if(arr[mid]<=k){
            low = mid + 1;
        }else{
            high = mid - 1;
        }
    }
    return low;
}
```



