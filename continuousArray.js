//将升序数组分割为连续整数数组
function continuousArray(arr){
    let result = [];
    if(!Array.isArray(arr) || arr.length === 0) return result;

    let slice, prev;

    //想想如何避免最后一个push

    arr.forEach((value) =>{
        if(prev + 1 === value){
            slice.push(value)
        }else{
            slice = [value]
            result.push(slice);
        }
        prev = value;
    });
    return result;
}




test('run', () => {
    expect(continuousArray([1,2,5,6,8,10,22,23,24,25,30])).toEqual([[1,2],[5,6],[8],[10],[22,23,24,25],[30]]);
    expect(continuousArray([3])).toEqual([[3]]);
    expect(continuousArray([])).toEqual([]);
    expect(continuousArray([2,3])).toEqual([[2,3]]);
    expect(continuousArray([1,3])).toEqual([[1],[3]]);
    // expect(continuousArray([5, 4, 3, 2, 1])).toBe(0);
});
