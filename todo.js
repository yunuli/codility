//而为有序数组查找

class node {
    constructor(value, edges) {

        this.value = value;
        this.edges = edges;
    }
}

class graph {

    constructor(nodes) {
        if (Array.isArray(nodes))
            this.nodes = nodes;
    }
    _dfs(nodes){
        for (let node of nodes) {
            if (this.visited[node.value] === true) return false;
            this.visited[node.value] = true;
            this._dfs();
        }
        return true;

    }
    dfs() {
        this.visited = new Array(this.nodes.length);
        let nodes = this.nodes;
        return this._dfs();
    }
}

