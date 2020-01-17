/*
*
*
* 假设有九宫格输入法键盘布局如下：

 [ 1,.?! ] [ 2ABC ] [ 3DEF  ]
 [ 4GHI  ] [ 5JKL ] [ 6MNO  ]
 [ 7PQRS ] [ 8TUV ] [ 9WXYZ ]
           [ 0空  ]
           *
           * 输入 123#222235/577#1223
           * 初始状态为数字输入模式
           * #号为切换模式，从数字模式切换为字母模式
           * /号为暂停
           * 字母模式连续输入时会在字母间循环切换
           * * 输入 123#222235/577#1223
           * 输出为 123adjjq1223
* #
 */

let keyboard = {
    '1': ',.?!',
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
    '0': ' #/'
}

let NUMBER_MODE = 0, CHAR_MODE = 1;

function convertInput1(input) {
    //look ahead version
    let output = '', mode = NUMBER_MODE, keyStart, selectedChars, keyCount;
    [].forEach.call(input, (keyPressed, index) => {
        // console.log(index,mode, char, keyStart);

        if (mode === NUMBER_MODE && keyPressed !== '#') {
            output += keyPressed;
        } else {
            // in char mode
            if (keyPressed !== input[index + 1]) {
                selectedChars = keyboard[keyPressed];
                if (selectedChars) {
                    keyCount = index - keyStart;
                    output += selectedChars[keyCount % selectedChars.length];
                }
                keyStart = index + 1;
            }
        }


        if (keyPressed === '#') {
            mode = (mode + 1) & 1;
        }
    });
    return output;
}

/*
no look ahead version, simulating real user input, where next input char is unknown
 */
function convertInput(input) {
    let output = '', mode = NUMBER_MODE, selectedChars, keyStart, keyPressed;
    for (let index = 0; index <= input.length; index++) {
        keyPressed = input[index] || '#';

        if (mode === NUMBER_MODE && keyPressed !== '#') {
            output += keyPressed;
        } else {
            // in char mode
            if (keyPressed !== input[index - 1]) {

                if (selectedChars) {
                    let keyCount = index - keyStart;
                    output += selectedChars[keyCount % selectedChars.length - 1];
                }
                selectedChars = keyboard[keyPressed];
                keyStart = index;
            }
        }

        if (keyPressed === '#') {
            mode = (mode + 1) & 1;
        }

    }
    return output;
}

test('keyboard', () => {
    expect(convertInput('123#222235/56')).toBe('123adjjm');
    expect(convertInput('123#222235/56#123')).toBe('123adjjm123');
    expect(convertInput('1223#222235/556#123')).toBe('1223adjkm123');
    expect(convertInput('1223#222235/556#123')).toBe('1223adjkm123');
    expect(convertInput('1223#222235/55799#123')).toBe('1223adjkpx123');
    expect(convertInput('1223#222235/55799###123')).toBe('1223adjkpx123');
    expect(convertInput('1223#222235/55799##234')).toBe('1223adjkpxadg');
    expect(convertInput('')).toBe('');
})
