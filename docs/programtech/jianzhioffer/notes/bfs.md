# BFS

## 二叉树打印为多行

从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。

**思路**

1. 这个就是二叉树的层序遍历，只不过需要每一行遍历之后，保存该行的遍历信息

```javascript
function Print(pRoot)
{
    // 层序遍历，返回一个二维数组
    if(!pRoot){
        return []
    }
    let res = []
    let que = []
    que.push(pRoot)
    while(que.length > 0){
        let len = que.length
        let i = 0
        let temp = []
        while(i<len){
            let node = que.shift()
            temp.push(node.val)
            if(node.left !== null){
                que.push(node.left)
            }
            if(node.right !== null){
                que.push(node.right)
            }
            i++
        }
        if(i === len){
            res.push(temp)
        }
    }
    return res
}
```

## 之字形打印二叉树