/**
 * find the path which has the maximum sum of all the path
 * a path is defined as any route between two nodes, does not have to pass the root
 * given the below binary tree
 *         1
 *       /  \
 *      2   3
 *      returns 6
 **/

let tf = require("./testFrame");


/**
 *
 * the path with max sum is
 *
 * 1. a path passes a node x
 * 1.1 the path starts from x, ends at its left subtree.
 * the part of the path on its left subtree is the path has the max sum among the paths that start from x's left child
 * 1.2 the path starts from x, ends at its
 */

function Tree(A) {
    this.treeNodes = A || [];
    this.mps = this.treeNodes[0];
}

Tree.prototype.getLength = function getLength() {
    return this.treeNodes.length
};

Tree.prototype.getRoot = function getRoot() {
    return this.treeNodes[0]
};

Tree.prototype.getValue = function getValue(index) {
    return this.treeNodes[index]
};

Tree.prototype.getLeftChild = function getLeftChild(index) {
    return index * 2 + 1;
};
Tree.prototype.getLeftChildValue = function getLeftChildValue(index) {
    return this.treeNodes[index * 2 + 1];
};

Tree.prototype.getRightChild = function getRightChild(index) {
    return (index + 1 ) * 2;
};
Tree.prototype.getRightChildValue = function getRightChildValue(index) {
    return this.treeNodes[(index + 1 ) * 2];
};

Tree.prototype.getParent = function getParent(index) {
    return index === 0 ? -1 : Math.floor(index / 2);
};
Tree.prototype.getParentNodeValue = function getParentNodeValue(index) {
    return this.treeNodes[Math.floor(index / 2)];
};

Tree.prototype.hasLeftChild = function hasLeftChild(index) {
    return !!this.getLeftChildValue(index);
};

Tree.prototype.hasRightChild = function hasRightChild(index) {
    return !!this.getRightChildValue(index);
};


Tree.prototype.getmps = function getmps(rootIndex) {
    let thisValue = this.getValue(rootIndex), left = thisValue, right = thisValue, leftmax = thisValue,
        rightmax = thisValue;

    if (this.hasLeftChild(rootIndex)) {
        let leftmps = this.getmps(this.getLeftChild(rootIndex));
        let max = Math.max(leftmps.left, leftmps.right);
        if (max > 0) left += max;
        leftmax = leftmps.leftmax;
    }
    if (this.hasRightChild(rootIndex)) {
        let rightmps = this.getmps(this.getRightChild(rootIndex));
        let max = Math.max(rightmps.left, rightmps.right);
        if (max > 0) right += max;
        rightmax = rightmps.rightmax;
    }

    let localmps = {
        include: left + right - thisValue,
        left: left,
        right: right,
        leftmax: leftmax,
        rightmax: rightmax
    };
    // Object.values(localmps).forEach((v) => {
    //     if (v > this.mps) {
    //         this.mps = v;
    //     }
    // });
    for(let key in localmps){
        if(this.mps < localmps[key])
            this.mps = localmps[key];
    }

    return localmps;
};

function solution(A) {
    let tree = new Tree(A);
    if (tree.getLength() === 0) return 0;
    if (tree.getLength() === 1) return tree.getRoot();

    tree.getmps(0);
    return tree.mps;
}

let testcases = [
    [[1,2,3]],
    [[1,null,3]],
    [[2]],
    [[-1,-2,-3]],
    [[-3,-1,-3]],
    [[1,3,-2, 1,4,10,1]],
];
tf.run(solution, testcases);