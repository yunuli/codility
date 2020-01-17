
function continuousArray(arr){
    let result = [];
    if(!Array.isArray(arr) || arr.length === 0) return result;

    let slice, prev;

    //想象如何避免最后一个push

    arr.forEach((value, index) =>{
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

/*

已经很久没有写博客了，2017年的最后一天写一篇，用这样的方式和2017年告别挺好的。这段时间经历找工作，是我这一年截止到目前最迷茫的时期。看看程序，思考能让我冷静下来，不被杂事打扰，前天看到了华为的一道面试题，今天晚上解出来了，没有测试内存和时间。通过键盘输入一串小写字母(a~z)组成的字符串。请编写一个字符串压缩程序，将字符串中连续出席的重复字母进行压缩，并输出压缩后的字符串。压缩规则： 1、仅压缩连续重复出现的字符。比如字符串"abcbc"由于无连续重复字符，压缩后的字符串还是"abcbc"。 2、压缩字段的格式为"字符重复的次数+字符"。例如：字符串"xxxyyyyyyz"压缩后就成为"3x6yz"。要求实现函数：void stringZip(const char *pInputStr, long lInputLen, char *pOutputStr); 输入pInputStr： 输入字符串lInputLen： 输入字符串长度 输出 pOutputStr： 输出字符串，空间已经开辟好，与输入字符串等长；注意：只需要完成该函数功能算法，中间不需要有任何IO的输入输出示例输入：“cccddecc” 输出：“3c2de2c” 输入：“adef” 输出：“adef” 输入：“pppppppp” 输出：“8p”
————————————————
版权声明：本文为CSDN博主「阿花是我啊」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/cumtml/article/details/78934837
 */
