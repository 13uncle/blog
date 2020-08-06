# 关于数据结构

## 数组简介

### 集合、列表和数组的区别

#### 集合

由一个或多个确定的元素所构成的整体。

**特性**

1. **集合里的元素类型不一定相同。**

2. **集合里的元素没有顺序。**

> 事实上，这样的集合并不直接存在于编程语言中。然而，实际编程语言中的很多数据结构，就是在集合的基础上添加了一些规则形成的。

#### 列表

是一种数据项构成的**有限序列**，即按照一定的**线性顺序**，排列而成的数据项的集合。

列表是**有顺序的、长度可变的**

**特性**

1. **列表中的元素类型可能不同，但一定是有顺序的。**
2. **列表的长度是可变的。**

> 在编程语言中，列表最常见的表现形式有数组和链表，而我们熟悉的栈和队列则是两种特殊类型的列表。

#### 数组

**数组是列表的实现方式之一**。数组具有列表的特征，同时还具有一些自己的特征。在不同的编程语言中，对数组的实现也会有一些差别。比如java，数组中的元素类型要一致；javascript，数组中的元素类型可以不同。

要区分列表和数组，可以通过**索引**这个概念来判断。

**索引**

**索引**是数组中用来表示每一个元素位置的值，通常从0开始。

**列表和数组的区别**

1. 数组具有索引，列表没有索引
2. 数组的元素在内存中是连续存储的，列表中的元素在内存中，可能连续，也可能不连续。

> 顺序存储结构和链式存储结构是数据结构中的物理结构层次。用以区分数据在内存中的存储方式。

### 数组的操作

#### 读取元素

访问数组中的某一个元素，就是通过索引访问的。索引对应于元素保存在内存中的内存地址。

当创建一个数组时，计算机会在内存中开辟一段**连续的空间**，并且**记录下索引为0的内存地址**。

读取数组中的某一元素时，会进行两步操作：

1. 计算机找到该数组索引为0的内存地址；
2. 获取到待读取元素的索引，**该元素的内存地址**=**索引0内存地址**+**待读取元素索引**

#### 查找元素

由于计算机只会记录数组索引为0的内存地址，所以查找元素的时候，会从索引0处开始，向后查询。

#### 插入元素

插入元素分为两种情况：

1. 在数组末尾插入
2. 在数组中间插入

插入元素的本质就是，计算出待插入位置的内存地址，然后把新元素放到该内存地址下。我们可以**通过数组来模拟计算机所做的工作过程**。

1. 新建一个长度比原数组多1的数组；
2. 遍历新数组，将原数组中插入位置（例：索引值**i**）`0`到`i-1`之前的元素，按顺序放入到新数组中；
3. 将新元素放入到新数组索引值 `i `的位置；
4. 将原数组索引值`i+1`到`length-1`，按顺序放入到新数组中。
5. 返回新数组，覆盖掉原数组。

**末尾插入**

计算机会通过数组的长度，和插入位置，计算出即将插入元素的内存地址。然后将新元素放到该地址下即可。

**中间插入**

计算机还是会计算出新元素，要插入的内存地址，但是由于该地址上已存在其他元素，所以计算机会**向后依次移动**插入位置及之后的元素，将该内存地址腾出来，然后将新元素放入到该地址下。

可见，频繁插入操作将会造成性能的问题。

#### 删除元素

同样的，删除元素，会根据索引来计算出删除元素的内存地址，然后删除数据，此时，会留下**空缺**位置，计算机会**向前依次移动**后面的元素，进行**填补**空缺。

### 例题

#### 寻找数组的中心索引

数组中心索引 ：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

**示例**

```
输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。
同时, 3 也是第一个符合要求的中心索引。
```

**思路**

1. 最初的思路

   遍历一遍数组，比较可能的中心索引前后的数值和，如果相等，返回。

   这个思路需要确定：

   - 如果数组长度为0或2，返回-1
   - 如果数组长度为1，返回0
   - 初始值，左侧为arr[0]，右侧需要遍历一遍数组求和，求和索引区间为`[2,length-2]`。

```javascript
function centerIndex(nums){
    var len = nums.length
    if(len === 0 || len === 2){
       return -1
    }
    if(len === 1){
       return 0
    }
    var frontSum = nums[0]
    var backSum = nums.slice(2,len).reduce(function(a,b){return a+b},0)
    var i = 1
    while(i<len-1){
         if(frontSum === backSum){
            return i
         }
        frontSum += nums[i]
        backSum -= nums[i+1]
        i++
    }
    return -1  
}
```

2. 思路优化

   判断条件可以改成，前半部分的和，是否等于，数组的总和减去中心索引值的一半，可以省略一步slice操作。

```javascript
var pivotIndex = function(nums) {
    var len = nums.length
    if(len === 0){
       return -1
    }
    var frontSum = 0
    var backSum = nums.reduce(function(a,b){return a+b},0)
    var i = 0
    while(i<len){
        if(frontSum === (backSum-nums[i])/2){
            return i
        }
        i++
        frontSum += nums[i-1]
    }
    return -1  
};
```

#### 搜索插入位置

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

**示例**

```
输入: [1,3,5,6], 5
输出: 2

输入: [1,3,5,6], 7
输出: 4
```

**思路**

1. 最初的思路

   数组检索，最开始想到的就是二分查找，效率高，易实现，二分查找就是不断的确定区间，查找的区间，一定是目标元素所在的区间，最终当左右指针重合时就是元素应该在的位置，如果，

   - 这个位置上的元素，等于目标元素，那么返回这个索引
   - 这个位置上的元素，不等于目标元素，那么目标元素应该插入这个索引位置，把这个索引返回。

```javascript
var searchInsert = function(nums, target) {
    if(!nums){
        return -1
    }
    var left = 0
    var right = nums.length-1
    while(left<=right){
        var mid = (left + right)>>1
        if(nums[mid]>=target){
            right = mid - 1
        }else{
            left =  mid + 1
        }
    }
    return left
};
```

#### 合并区间

给出一个区间的集合，请合并所有重叠的区间。

**示例**

```
输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
```

**思路**

1. 最初的思路

- 合并对数组有什么要求？

  需要将数组按左区间值得大小递增排序。

- 合并的条件是什么？

  当区间左端点的值小于等于上一个区间的右端点，则需要合并。

- 特殊情况是什么？

  数组中没有元素或者只有一个元素，应该返回数组本身，不需要操作。

  当前区间右端点，小于前一个区间的右端点时，区间成包含关系，对于包含的区间可以不处理，直接进行下一轮循环。

```javascript
var merge = function(intervals) {
    if(intervals.length < 2){
        return intervals
    }
    // 对intervals按左区间值排序
    intervals.sort(function(a,b){
        return a[0] - b[0]
    })
    let res = []
    res.push(intervals[0])
    for(let i = 1;i<intervals.length;i++){
        if(intervals[i][0]>res[res.length - 1][1]){
            res.push(intervals[i])
        }else{
            if(intervals[i][1]>res[res.length - 1][1]){
                res[res.length - 1][1] = intervals[i][1]
            }
        }
    }
    return res
};
```

## 二维数组

### 二维数组概述

二维数组可以看成一维数组的每一个元素都仍然是数组。索引都是从0开始。可以把二维数组看成一个**矩阵**。

二维数组在内存中仍然是以连续的内存空间存储的。计算机记录索引为00的内存地址。

### 例题

#### 旋转矩阵

给你一幅由 `N × N` 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。

不占用额外内存空间能否做到？

**示例**

```
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**思路**

1. 最初的想法

   需要创建一个数组的空间，这个方法就不是在原matrix上修改，不符合题意。而且空间复杂度较高。就是把行-->列，或者列-->行，超low代码如下。

```javascript
var rotate = function(matrix) {
    if(matrix.length < 2){
        return matrix
    }
    var res = []
    
    var col = 0
    while(col<matrix.length){
        var row = matrix.length-1
        var temp = []
        while(row>=0){
            temp.push(matrix[row][col])
            row--
        }
        console.log(temp)
        res.push(temp)
        col++
    }
    return res
};
```

2. 正确的思路

   设A为m*n阶矩阵（即m行n列），第i 行j 列的元素是a(i,j)，即：
   $$
   A = (a_{ij})_{m*n}
   $$
   转置矩阵就是将行列下标进行互换，即转置后的矩阵为n*m阶的矩阵：
   $$
   A = (a_{ji})_{{n*m}}
   $$
   然而转置之后的矩阵，和我最终要求的矩阵还有一些差别，就是每行元素还需要进行一步翻转工作。最终得到结果矩阵。

```javascript
var rotate = function(matrix) {
    if(matrix.length < 2){
        return matrix
    }
    // 进行转置
    for(let i = 0;i<matrix.length;i++){
        for(let j = i;j<matrix.length;j++){
            [matrix[i][j],matrix[j][i]] = [matrix[j][i],matrix[i][j]]
        }
    }
    // 进行每一行的反转
    for(let i = 0;i<matrix.length;i++){
        matrix[i] = matrix[i].reverse()
    }
};
```

3. 大神思路

   旋转操作的本质，

   矩阵中第`i`行第`j`列的元素，旋转后，为**倒数**第`i`列第`j`行的元素

   在不创建额外数组的情况下，将改变后的值放入到原数组后面，最后，对原数组进行删除操作，将多余的部分切分掉。

```javascript
var rotate = function(matrix) {
const length = matrix.length;

  for(let i = length - 1; i >= 0; i--) {
    for(let j = 0; j < length; j++) {
      matrix[j].push(matrix[i][j]);
    }
  }

  for(let i = 0; i < length; i++) {
    matrix[i].splice(0, length);
  }
}
```

#### 零矩阵

编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

**示例**

```
输入：
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出：
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

**思路**

1. 最初的思路

   矩阵中出现0，即把0所在的行和列都置为0，我只要拿到矩阵中所有0的，行列坐标，那么根据这些坐标，修改矩阵元素就可以了。然而代码low的不行。

```javascript
var setZeroes = function(matrix) {
    var row = []
    var col = []
    for(let i = 0;i<matrix.length;i++){
        for(let j = 0;j<matrix[0].length;j++){
            if(matrix[i][j] === 0){
                row.push(i)
                col.push(j)
            }
        }
    }
    row.forEach(function(item){
       matrix[item] = matrix[item].map(v=>v=0)
    })
    for(let i = 0;i<matrix.length;i++){
        col.forEach(function(item){
            matrix[i][item] = 0
        })
    }
};
```

2. 同样low的思路

```javascript
var setZeroes = function(matrix) {
    var isRow0 = false
    var row = 0
    var colSet = new Set()
    while(row<matrix.length){
        var col = 0
        while(col<matrix[0].length){
            if(matrix[row][col] === 0){
                isRow0 = true
                colSet.add(col)
            }
            col++
        }
        if(isRow0){
           matrix[row] = matrix[row].map(v=>v=0)
           isRow0 = false
        }
        row++
    }
   matrix = matrix.map(item => colSet.forEach(v=>item[v] = 0))
};
```

3. 正常的解法

   其实和我的思路是差不多的，都是找0替换。

```javascript
var setZeroes = function(matrix) {
    let rows = new Set(), cols = new Set();
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                rows.add(row);
                cols.add(col);
            }
        }
    }
    //行清零
    for (let row of rows) {
        for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] = 0;
        }
    }
    //列清零
    for (let col of cols) {
        for(let row = 0; row < matrix.length; row++) {
            matrix[row][col] = 0;
        }
    }
};
```

```javascript
var setZeroes = function(matrix) {
    
    const row = matrix.length;
    const column = matrix[0].length;
    const newMatrix = JSON.parse(JSON.stringify(matrix));
    for (let i = 0; i<row; i++){
        for (let j = 0; j < column; j++){
            if (newMatrix[i][j] === 0) {
                for (let i1 = 0; i1<row; i1++){
                    matrix[i1][j] = 0;
                }
                for (let j1 = 0; j1<column; j1++){
                    matrix[i][j1] = 0;
                }
            }
        }
    }

    return matrix;
};
```

## 字符串简介

字符串在javascript中是不可变的基本类型，也就是修改其中的某个字符，并不能达到修改字符串的目的，如下代码，将不会对字符串完成修改。

```
var str = "Hello JS"
str[7] = "s"
console.log(str) // "Hello JS"
```

若要实现修改，需要创建新的字符串，对原字符串进行替换。

### 例题

#### 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例**

```
输入: ["flower","flow","flight"]
输出: "fl"

输入: ["aa","aa"]
输出: "aa"
```

**思路**

1. 最初的思路

   求公共前缀，那么我就可以通过任意字符串的开头字母，构造正则，然后用这个正则表达式去验证字符串数组中的每一个字符串，全部返回true，直到校验不通过。则用于构建这个正则的字符串，即为最长公共前缀。low的一批的思路，然而只有更low，没有最low。

   第二个想法，可以使用Set，使用双重循环，每次往Set中添加字符，如果一轮循环过后，Set的size为1，那么这个字符可以被添加到前缀中。这个方法要注意对字符是否存在，Set大小超过1的判断。

2. 正常的解题思路

   对字符串数组里面的字符串进行字典排序。使用比较操作符，可以完成这一操作，比较操作符，在比较两个字符串时，会将字符串转为字符编码值进行比较。这样操作之后，如果第一个字符串和最后一个字符串，某个位置上的字符相等，那么其中间的字符串，在该位置上，也都是一样的字符。

```javascript
var longestCommonPrefix = function(strs) {
    if(strs.length === 0){
        return ""
    }
    // 按照字典序排序
    var start = strs[0]
    var end = strs[0]
    var ret = ""
    for(let i = 0;i<strs.length;i++){
        if(strs[i]<start){
            start = strs[i]
        }
        if(strs[i]>end){
            end = strs[i]
        }
    }
    for(let j = 0;j<start.length;j++){
        if(start.charAt(j)!==end.charAt(j)){
            break
        }
        ret += start.charAt(j)
    }
    return ret
};
```

#### 最长回文子串

暴力法

```javascript
var longestPalindrome = function(s) {
    if(s.length < 2){
        return s
    }
    var begin = 0
    var len = 1
    var charArray = s.split('')
    for(let i = 0;i<s.length-1;i++){
        for(let j = i+1;j<s.length;j++){
            if(j-i+1 > len && validatePalindrome(charArray,i,j)){
                len = j-i+1
                begin = i
            }
        }
    }
    return s.substring(begin,begin+len)
}

function validatePalindrome(str,left,right){
    while(left<right){
        if(str[left] !== str[right]){
            return false
        }
        left++
        right--
    }
    return true
}
```

中心扩展法

```javascript
var longestPalindrome = function(s) {
    if(s.length < 2){
        return s
    }
    var begin = 0
    var len = 1
    var charArray = s.split('')
    for(let i = 0;i<s.length-1;i++){
        var oddLen = expand(charArray,i,i)
        var evenLen = expand(charArray,i,i+1)
        var maxLen = Math.max(oddLen,evenLen)

        if(maxLen>len){
            len = maxLen
            begin = i - Math.floor((len-1)/2)
        }
    }
    return s.substring(begin,begin+len)
}

function expand(str,left,right){
    var i = left
    var j = right
    while(i>=0 && j<str.length){
        if(str[i] === str[j]){
            i--
            j++
        }else{
            break
        }
    }
    // 当跳出循环时，str.charAt(i) !== str.charAt(j),所以长度为j-i+1-2
    return j-i-1
}
```