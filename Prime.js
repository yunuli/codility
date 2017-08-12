// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
    function primes(N){
        let primes = [1,2];
        for(let i = 3; i <= N; i+=2){
            let j = 1, isPrime = true;
            for(; j < primes.length && primes[j] <= Math.sqrt(i); j++){
                if(i % primes[j] == 0){
                    isPrime = false;
                    break;
                }
            }
            if(isPrime) primes.push(i);
        }
        return primes;
    }

    let p = primes(Math.sqrt(N));
    //console.log(p);
    for(let i = p.length - 1; i >=0; i--){
        if(N % p[i] == 0) return 2* (N / p[i] + p[i]);
    }
    // write your code in JavaScript (Node.js 6.4.0)
}