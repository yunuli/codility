class TreeNode {
    constructor({value, left, right} = {}) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function checkBoundary(target, name, descriptor) {
    const oldValue = descriptor.value;

    return function (...args) {
        if (args[0] < 0 || args[0] > this.treeNodes.length) throw Error('tree node index out of bound');
        oldValue.apply(this, args)
    }
}

class binaryTree {
    constructor(tree = []) {
        //todo check type of tree and tree elements
        this.buildTree(tree);
    }

    checkIndex(index) {
        return index >= 0 || index < this.treeNodes.length;
    }


    // @checkBoundary
    parent(treeNodeIndex) {
        return this.treeNodes[Math.floor((treeNodeIndex - 1) / 2)];
    }

    left(treeNodeIndex) {
        return this.treeNodes[treeNodeIndex * 2 + 1];
    }

    right(treeNodeIndex) {
        return this.treeNodes[treeNodeIndex * 2 + 2];
    }

    hasLeft(treeNodeIndex) {
        return !this.left(treeNodeIndex);
    }

    hasRight(treeNodeIndex) {
        return !this.right(treeNodeIndex);
    }


    buildTree(tree) {
        const treeNodes = this.treeNodes = tree;

        for (let i = treeNodes.length - 1; i >= 0; i--) {
            if (treeNodes[i] != undefined) {
                treeNodes[i] = {value: treeNodes[i]};
                treeNodes[i].left = this.left(i);
                treeNodes[i].right = this.right(i);
            }
        }
    }

    visit(n) {
        console.log(n.value);
    }

    middleTraverse() {
        const stack = [];
        let node = this.treeNodes[0];

        //traverse begin
        while (node || stack.length > 0) {
            while (node) {
                stack.push(node);
                node = node.left;
            }

            node = stack.pop();
            this.visit(node);

            node = node.right;
        }
    }

    preTraverse() {
        const stack = [];
        let node = this.treeNodes[0];

        while (node || stack.length > 0) {
            while (node) {
                this.visit(node);
                if (node.right) stack.push(node.right);
                node = node.left;
            }

            node = stack.pop();
        }
    }

    postTraverse() {
        const stack = [];
        let node = this.treeNodes[0];

        while (node || stack.length > 0) {
            while (node) {
                stack.push(node);
                node = node.left;
            }

            node = stack[stack.length - 1];

            if (node.right && !node.right.visited) {
                node = node.right;
            } else {
                this.visit(node);
                node.visited = true;
                stack.pop();
                node = null;
            }
        }

    }

}


printDelimiter = () => console.log('-'.repeat(20));

function* range(start, end, step = 1) {
    if (arguments.length === 1) {
        start = 0;
        end = arguments[0];
    }

    let count = Math.ceil((end - start) / step);

    while (count-- > 0) {
        yield start;
        start += step;
    }
}


+function run() {
    const tree = [0, , 2, 3, , 5, 6, 7];
    // const tree = [...range(7)];
    const bt = new binaryTree(tree);
    bt.middleTraverse();
    printDelimiter();
    bt.preTraverse();
    printDelimiter();
    bt.postTraverse()

}();


