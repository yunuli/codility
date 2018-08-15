/**
 bisearch
 **/

let tf = require("./testFrame");


//random

function simulate(n){

    let originalCard = Array(n), finalCards = Array(n), leftCards = n;

    for(let i = 0; i < n; i++){
        originalCard[i] = i;
    }

    while(leftCards > 0){
        finalCards[--leftCards] = originalCard.shift();
        originalCard.push(originalCard.shift());
    }

    for(let i = 1; i<= n; i++){
        originalCard[finalCards[i - 1]] = i;
    }
    return originalCard;

}

function solution(n) {
    return simulate(n);
}

let testcases = [
    [3],
    [4],
    [5],
    [7],
    [8],
    [16],
    [17]
];
tf.run(solution, testcases);