# Obfuscator(js代码压缩与混淆)

::: tip 提示
js代码压缩与混淆，它可以和Webpack 结合起来，最终输出压缩和混淆后的 js代码，使得可读性大大降低，难以逆向。功能包括：代码压缩，变量名混淆，字符串混淆，代码自我保护，控制流平坦化，僵尸代码注入，对象键名替换，禁用控制台输出，调试保护，域名锁定等。
:::

## 使用流程

安装：
```bash
$ yarn add --dev javascript-obfuscator
# OR
$ npm install --save-dev javascript-obfuscator
```
使用案例：
```bash
const code = `
    (function(){
        if (true) {
            var foo = function () {
                console.log('abc')
                console.log('cde')
                console.log('efg')
                console.log('hij')
            }
            foo()
        }
    })();
`
const options = {
	compact: false,
	identifierNamesGenerator: 'hexadecimal'
}
const obfuscator = require('javascript-obfuscator')
function obfuscate(code, options) {
return obfuscator.obfuscate(code, options).getObfuscatedCode()
}
console.log(obfuscate(code, options))
```
::: tip 说明
1. getObfuscatedCode()：返回带有混淆的js代码的字符串
2. sourceCode：有效的源代码，以字符串形式作为参数
3. options：配置项的对象集合
:::

## options配置

### 1.代码压缩
Compact： 完成 JavaScript 代码的压缩，输出为一行内容
```bash
const code = `
    let ff = 'hello world'
    console.log(ff)
`
const options = {
	compact: false, // 代码压缩
	stringArray: false, // 字符串混淆
}

let ff = 'hello\x20world';
console['log'](ff);

compact: true
let ff='hello\x20world';console['log'](ff); // compact: true 返回的
```
### 2.变量名混淆
1.identifierNamesGenerator：控制变量名混淆，有四个参数，默认的值为hexadecimal

  (1) hexadecimal：将变量名替换为 16 进制形式的字符串，如 0xabc123

  (2)dictionary：字典，需要结合identifiersDictionary字典列表

  (3) mangled：将变量名替换为普通的简写字符，如 a、b、c 等

  (4)mangled-shuffled: 混排字母表

2.identifiersDictionary:[]，字典列表

3.renameGlobals：指定是否混淆全局变量和函数名称，默认值为false，如果设置为true可能导致代码执行不通
```bash
// input
let globalStr = 'global'
console.log(globalStr)
(function(){
	let str = 'hello word'
	console.log(str)
})()

// output
const _0x5827 = [
    'global',
    'log'
];
(function (_0x315905, _0x5827fb) {
    const _0x48753c = function (_0x1cefd6) {
        while (--_0x1cefd6) {
            _0x315905['push'](_0x315905['shift']());
        }
    };
    _0x48753c(++_0x5827fb);
}(_0x5827, 0x133));
const _0x4875 = function (_0x315905, _0x5827fb) {
    _0x315905 = _0x315905 - 0x0;
    let _0x48753c = _0x5827[_0x315905];
    return _0x48753c;
};
let globalStr = _0x4875('0x1');
console[_0x4875('0x0')](globalStr)(function () {
    let _0x3f3aa3 = 'hello\x20word';
    console['log'](_0x3f3aa3);
})();

```
### 3.字符串混淆
1.stringArray： 将一个字符串声明放到一个数组里面，使之无法被直接搜索到，默认为 true

2.identifiersPrefix：控制混淆后的变量前缀

3.rotateStringArray：控制数组化后结果的的元素顺序，默认为 true

4.stringArrayEncoding：控制数组的编码形式，默认不开启编码，如果设置为 true 或 base64，则会使用 Base64 编码，如果设置为 rc4，则使用 RC4（流加密算法） 编码

5.stringArrayThreshold：控制启用编码的概率，范围 0 到 1，默认 0.8

6.unicodeEscapeSequence: 对字符串进行 Unicode 转码，使之更加难以辨认
```bash
// input
let globalStr = 'global'
console.log(globalStr)
(function(){
	let str = 'hello word'
	console.log(str)
})();

// output
const lff_0x3f08 = [
    'z2XVyMfS',
    'AgvSBg8GD29Yza==',
    'Bg9N'
];
(function (_0x585c8a, _0x3f08b6) {
    const _0x2c8e46 = function (_0x9d90fd) {
        while (--_0x9d90fd) {
            _0x585c8a['push'](_0x585c8a['shift']());
        }
    };
    _0x2c8e46(++_0x3f08b6);
}(lff_0x3f08, 0x1d7));
const lff_0x2c8e = function (_0x585c8a, _0x3f08b6) {
    _0x585c8a = _0x585c8a - 0x0;
    let _0x2c8e46 = lff_0x3f08[_0x585c8a];
    if (lff_0x2c8e['RAHqoz'] === undefined) {
        var _0x9d90fd = function (_0xfca9b6) {
            const _0x159fb0 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=', _0xeea76f = String(_0xfca9b6)['replace'](/=+$/, '');
            let _0x5e8d6d = '';
            for (let _0x369f31 = 0x0, _0x22973e, _0x483fbe, _0x1d6bb2 = 0x0; _0x483fbe = _0xeea76f['charAt'](_0x1d6bb2++); ~_0x483fbe && (_0x22973e = _0x369f31 % 0x4 ? _0x22973e * 0x40 + _0x483fbe : _0x483fbe, _0x369f31++ % 0x4) ? _0x5e8d6d += String['fromCharCode'](0xff & _0x22973e >> (-0x2 * _0x369f31 & 0x6)) : 0x0) {
                _0x483fbe = _0x159fb0['indexOf'](_0x483fbe);
            }
            return _0x5e8d6d;
        };
        lff_0x2c8e['HNFcnx'] = function (_0x102bfd) {
            const _0x3d9e87 = _0x9d90fd(_0x102bfd);
            let _0x44445e = [];
            for (let _0x54c74f = 0x0, _0x4fbcab = _0x3d9e87['length']; _0x54c74f < _0x4fbcab; _0x54c74f++) {
                _0x44445e += '%' + ('00' + _0x3d9e87['charCodeAt'](_0x54c74f)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(_0x44445e);
        }, lff_0x2c8e['HrkeqN'] = {}, lff_0x2c8e['RAHqoz'] = !![];
    }
    const _0x49cdb4 = lff_0x2c8e['HrkeqN'][_0x585c8a];
    return _0x49cdb4 === undefined ? (_0x2c8e46 = lff_0x2c8e['HNFcnx'](_0x2c8e46), lff_0x2c8e['HrkeqN'][_0x585c8a]
= _0x2c8e46) : _0x2c8e46 = _0x49cdb4, _0x2c8e46;
};
let globalStr = lff_0x2c8e('0x0');
console[lff_0x2c8e('0x2')](globalStr)(function () {
    let _0x102bfd = lff_0x2c8e('0x1');
    console[lff_0x2c8e('0x2')](_0x102bfd);
})();
```

### 4.代码自我保护
selfDefending：开启代码自我保护功能。开启之后，混淆后的 JavaScript 会以强制一行形式显示，如果我们将混淆后的代码进行格式化（美化）或者重命名，该段代码将无法执行，默认值为false

### 5.控制流平坦化
控制流平坦化其实就是将代码的执行逻辑混淆，使其变得复杂难读。其基本思想是将一些逻辑处理块都统一加上一个前驱逻辑块，每个逻辑块都由前驱逻辑块进行条件判断和分发，构成一个个闭环逻辑，导致整个执行逻辑十分复杂难读。但启用控制流扁平化之后，代码的执行时间会变长，最长达 1.5 倍之多。

controlFlowFlattening：控制是否开启控制流平坦化

controlFlowFlatteningThreshold: 控制比例，取值范围是 0 到 1，默认 0.75

``` bash
// input
(function(){
    function foo () {
        return function () {
            var sum = 1 + 2;
            console.log(1);
            console.log(2);
            console.log(3);
            console.log(4);
            console.log(5);
            console.log(6);
        }
    }
    
    foo()();
})();

// output
(function () {
    function _0x3bfc5c() {
        return function () {
            var _0x3260a5 = {
                'WtABe': '4|0|6|5|3|2|1',
                'GokKo': function _0xf87260(_0x427a8e, _0x43354c) {
                    return _0x427a8e + _0x43354c;
                }
            };
            var _0x1ad4d6 = _0x3260a5['WtABe']['split']('|'), _0x1a7b12 = 0x0;
            while (!![]) {
                switch (_0x1ad4d6[_0x1a7b12++]) {
                case '0':
                    console['log'](0x1);
                    continue;
                case '1':
                    console['log'](0x6);
                    continue;
                case '2':
                    console['log'](0x5);
                    continue;
                case '3':
                    console['log'](0x4);
                    continue;
                case '4':
                    var _0x1f2f2f = _0x3260a5['GokKo'](0x1, 0x2);
                    continue;
                case '5':
                    console['log'](0x3);
                    continue;
                case '6':
                    console['log'](0x2);
                    continue;
                }
                break;
            }
        };
    }

	_0x3bfc5c()();
}());
```

### 6.僵尸代码注入

僵尸代码即不会被执行的代码或对上下文没有任何影响的代码，注入之后可以对现有的 JavaScript 代码的阅读形成干扰,大大增加了代码的大小（最多200%）

deadCodeInjection：控制是否开启

deadCodeInjectionThreshold : 控制僵尸代码注入的比例，取值 0 到 1，默认是 0.4
``` bash
// input
(function(){
    if (true) {
        var foo = function () {
            console.log('abc');
            console.log('cde');
            console.log('efg');
            console.log('hij');
        };
        
        var bar = function () {
            console.log('klm');
            console.log('nop');
            console.log('qrs');
        };
    
        var baz = function () {
            console.log('tuv');
            console.log('wxy');
            console.log('z');
        };
    
        foo();
        bar();
        baz();
    }
})();


// output
var _0x5024 = [
    'zaU',
    'log',
    'tuv',
    'wxy',
    'abc',
    'cde',
    'efg',
    'hij',
    'QhG',
    'TeI',
    'klm',
    'nop',
    'qrs',
    'bZd',
    'HMx'
];
var _0x4502 = function (_0x1254b1, _0x583689) {
    _0x1254b1 = _0x1254b1 - 0x0;
    var _0x529b49 = _0x5024[_0x1254b1];
    return _0x529b49;
};
(function () {
    if (!![]) {
        var _0x16c18d = function () {
            if (_0x4502('0x0') !== _0x4502('0x0')) {
                console[_0x4502('0x1')](_0x4502('0x2'));
                console[_0x4502('0x1')](_0x4502('0x3'));
                console[_0x4502('0x1')]('z');
            } else {
                console[_0x4502('0x1')](_0x4502('0x4'));
                console[_0x4502('0x1')](_0x4502('0x5'));
                console[_0x4502('0x1')](_0x4502('0x6'));
                console[_0x4502('0x1')](_0x4502('0x7'));
            }
        };
        var _0x1f7292 = function () {
            if (_0x4502('0x8') === _0x4502('0x9')) {
                console[_0x4502('0x1')](_0x4502('0xa'));
                console[_0x4502('0x1')](_0x4502('0xb'));
                console[_0x4502('0x1')](_0x4502('0xc'));
            } else {
                console[_0x4502('0x1')](_0x4502('0xa'));
                console[_0x4502('0x1')](_0x4502('0xb'));
                console[_0x4502('0x1')](_0x4502('0xc'));
            }
        };
        var _0x33b212 = function () {
            if (_0x4502('0xd') !== _0x4502('0xe')) {
                console[_0x4502('0x1')](_0x4502('0x2'));
                console[_0x4502('0x1')](_0x4502('0x3'));
                console[_0x4502('0x1')]('z');
            } else {
                console[_0x4502('0x1')](_0x4502('0x4'));
                console[_0x4502('0x1')](_0x4502('0x5'));
                console[_0x4502('0x1')](_0x4502('0x6'));
                console[_0x4502('0x1')](_0x4502('0x7'));
            }
        };
        _0x16c18d();
        _0x1f7292();
        _0x33b212();
    }
}());
```

### 7.对象键名替换

transformObjectKeys：转换（混淆）对象键。例如，此代码var a = {enabled：true};使用此选项进行模糊处理时，将隐藏已启用的对象键：var a = {};a [_0x2ae0 [（'0x0'）] = true;。 理想情况下与StringArray设置一起使用

``` bash
// input
(function(){
	var object = {
			foo: 'test1',
			bar: {
					baz: 'test2'
			}
	};
})(); 

// output
var _0x1348 = [
    'baz',
    'test2',
    'foo',
    'bar'
];
(function (_0x245709, _0x13482c) {
    var _0x30b424 = function (_0x14717a) {
        while (--_0x14717a) {
            _0x245709['push'](_0x245709['shift']());
        }
    };
    _0x30b424(++_0x13482c);
}(_0x1348, 0xfc));
var _0x30b4 = function (_0x245709, _0x13482c) {
    _0x245709 = _0x245709 - 0x0;
    var _0x30b424 = _0x1348[_0x245709];
    return _0x30b424;
};
(function () {
    var _0x2c6d42 = {};
    _0x2c6d42[_0x30b4('0x0')] = _0x30b4('0x1');
    var _0x391066 = {};
    _0x391066[_0x30b4('0x2')] = 'test1', _0x391066[_0x30b4('0x3')] = _0x2c6d42;
    var _0x123176 = _0x391066;
}());
```

### 8.禁用控制台输出

使用 disableConsoleOutput 来禁用掉 console.log 输出功能，加大调试难度

### 9.调试保护

debugProtection：禁用调试模式，进入无限 Debug 模式

debugProtectionInterval：来启用无限 Debug 的间隔，使得代码在调试过程中会不断进入断点模式，无法顺畅执行

### 10.域名锁定

domainLock：锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得有人只需复制并粘贴源代码并在别处运行就变得非常困难。多个域和子域可以将代码锁定到多个域或子域。例如：domainLock: [‘easyword.offcn.com’]

### 11.其他属性

shuffleStringArray：洗牌StringArray生成的数组，默认为true

speed: 生成的重复结果次数，默认为0，默认为true

Log：允许将信息记录到控制台，默认为false

numbersToExpressions:启用数字为表达式，默认为false

## 官方推荐的三种配置
1. 性能将比没有混淆的情况下慢50-100%
``` bash
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```
2. 性能将比没有混淆的情况下降低30-35%
``` bash
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```
3. 性能会比没有混淆的情况稍微慢一些
``` bash
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

## Webpack 结合使用

Webpack 结合使用，输出压缩和混淆后的js代码

下载webpack-obfuscator
```bash
npm install --save-dev webpack-obfuscator
```
使用
```bash
Let WebpackObfuscator = require('webpack-obfuscator');
plugins: [
    new WebpackObfuscator ({
        rotateStringArray: true
        ...
},  ['test.js'])]  // test.js:不混淆的代码

]
```

### api链接

https://github.com/javascript-obfuscator/javascript-obfuscator



