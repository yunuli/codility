function partition(A, left, right){
    let pivot = A[Math.floor((left + right) / 2)];

    let i = left, j = right;

    while(i < j){
       while(A[i] < pivot){
           i++;
       }
       while(A[j] > pivot){
           j--;
       }

       if(i < j){
           [A[i], A[j]] = [A[j], A[i]];
       }
       i++;
       j--;
    }

    return i;
}

let A = [ 1, 3, 5, 2, 4, 6, 0];
 A = [ 0, 1];

 let p = partition(A, 0, A.length - 1);
 console.log(A, p);

var partition2 = function(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], //{8}
        i = left,
        j = right;
    while (i <= j) {
        while (array[i] < pivot) {  //{12}
            i++; }
        while (array[j] > pivot) {  //{13}
            j--;
        }
        if (i <= j) { //{14}
            [A[i], A[j]] = [A[j], A[i]];
            i++;
            j--;
        } }
    return i; //{16}
};

function qsort(A, left, right){
    if(right <= left) return;
    let index = partition2(A, left, right);

    qsort(A, left, index);
    qsort(A, index + 1, right)
}

var quick = function(array, left, right){
    var index; //{1}
    if (array.length > 1) { //{2}
        index = partition2(array, left, right); //{3}
        if (left < index - 1 ) {
            quick(array, left, index - 1 );
        }
        if (index< right) {
            quick(array, index, right);
        } }
};

quick(A, 0, A.length - 1);
console.log(A);
