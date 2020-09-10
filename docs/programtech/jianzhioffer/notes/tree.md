# 树

## 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

**示例**

```
输入
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

输出         3
           / \
          9  20
            /  \
           15   7
```

**思路**

1. 明确前序遍历和中序遍历的特点，
   - 前序遍历序列的第一个值，为根节点
   - 已知根节点的情况下，在中序遍历序列中，根节点前的部分为左子树，根节点后的部分为右子树
   - 通过中序遍历序列中的左右子树长度，可以在前序遍历中，确定左右子树，并确定该子树的根节点
   - 构建树，即构建根节点及其左右子树，进行递归构建。

```javascript
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0){
        return null
    }

    let head = new TreeNode(preorder[0])
    let index
    for(let i = 0,len = inorder.length;i<len;i++){
        if(inorder[i] === preorder[0]){
            index = i
            break
        }
    }
    head.left = buildTree(preorder.slice(1,index+1),inorder.slice(0,index+1))
    head.right = buildTree(preorder.slice(index+1,preorder.length), inorder.slice(index+1,inorder.length))
    return head
};
```

## 平衡二叉树

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树

**思路**

1. 通过平衡二叉树的定义可以找到问题解决的突破口，计算二叉树的高度
   - 左右子树高度差小于2，则该树可能平衡
   - 再判断左右子树是否平衡

```javascript
var isBalanced = function(root) {
    if(root === null){
        return true
    }
    var left = deep(root.left)
    var right = deep(root.right)
    if(Math.abs(left-right)>1){
        return false
    }
    return isBalanced(root.left) && isBalanced(root.right)
};

var deep = function(node){
    if(node === null){
        return 0
    }
    var leftDeep = deep(node.left)
    var rightDeep = deep(node.right)
    return Math.max(leftDeep,rightDeep)+1
}
```

