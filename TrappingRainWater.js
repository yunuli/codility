/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
 */
let tester = require('./testFrame');
function solution(A){
    let stack = [], sum = 0;
    Array.prototype.top = function(){
        return this.length === 0 ? undefined : this[this.length - 1];
    };
    A.forEach((height, index) => {
        if(stack.length === 0 || height < stack.top().height){
            stack.push({height, index});
        } else{
            const lowerEdge = stack[0].height > height ? height : stack[0].height;
            while(stack.length > 0 && height > stack.top().height){
                const item = stack.pop();
                sum += (index - item.index) * (lowerEdge - item.height);
            }
            if(stack.length === 0 ||  height < stack.top().height) stack.push({height, index});
        }
    });
    return sum;

}

let testcases = [
    [[0,1,0,2,1,0,1,3,2,1,2,1]],//6
    [[5, 10, 9, 8, 7, 6, 7, 8, 9, 8]],//9
    [[1, 3, 2, 1, 2, 1, 5, 3, 3, 4, 2]],//9
    [[10, 9, 8, 7, 6, 7, 8, 9]],//9
    // [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6]],//5
    // [[11, 9, 8, 7, 6, 7, 20, 9, 1, 6]],//5
    // [[11, 9, 8, 7, 6, 7, 20, 9, 1, 30]],//19
    // [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6, 20]],//19
    // [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6]],//5
    [[10, 9, 8, 7, 6]],//0
    [[6, 7, 8, 9]],//0
    [[6, 7, 8, 9, 8, 7]],//0
    [[6, 6, 6, 6, 6]]//0
];
tester.run(solution, testcases);
