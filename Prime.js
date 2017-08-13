// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
let tester=require('./testFrame');
function solution(N) {


    let p = primes(Math.sqrt(N));
    //console.log(p);
    for(let i = p.length - 1; i >=0; i--){
        if(N % p[i] == 0) return 2* (N / p[i] + p[i]);
    }
    // write your code in JavaScript (Node.js 6.4.0)
}

function primes(N){
    let primes = [1,2];
    for(let i = 3; i <= N; i+=2){
        let j = 1, isPrime = true;
        let sqrtI  = Math.sqrt(i);//or i*i <=N
        for(; j < primes.length && primes[j] <= sqrtI ; j++){
            if(i % primes[j] == 0){
                isPrime = false;
                break;
            }
        }
        if(isPrime) primes.push(i);
    }
    return primes;
}

function sieveOfEratosthenes(N){
    //O(N*log(log(N))) time complexity
    let numbers = new Array(N+1), primes=[];

    for(let i = 2; i*i <= N; i++){
        if(numbers[i] === undefined){
            numbers[i] == true;
            primes.push(i);
            for(let j = i*i; j <= N; j+=i){
                numbers[j] = false;
            }
        }
    }
    return primes;
}

//todo
function factorization(){
    //use sieve method, only O(log(N)) time complexity
}
let testcases = [4];

tester.run(sieveOfEratosthenes, testcases);