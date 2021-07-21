# crypto(js数据加密)
::: tip 提示
crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
:::

### 下载
``` bash
npm install crypto-js --save-dev
```

## MD5和SHA1

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
``` bash
const crypto = require('crypto');
const hash = crypto.createHash('md5');
// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
```
::: tip 提示
1. hash.digest([encoding])

encoding 返回值的字符编码。

计算传入要被哈希（使用 hash.update() 方法）的所有数据的摘要。 如果提供了 encoding，则返回字符串，否则返回 Buffer。

调用 hash.digest() 方法之后， Hash 对象不能被再次使用。 多次调用将会导致抛出错误。

2. hash.update(data[, inputEncoding])

inputEncoding data 字符串的字符编码。

使用给定的 data 更新哈希的内容，该数据的字符编码在 inputEncoding 中给出。 如果未提供 encoding，并且 data 是字符串，则强制执行 'utf8' 的编码。 如果 data 是一个 Buffer、 TypedArray 或 DataView，则 inputEncoding 会被忽略。

在流式传输时，可以使用新数据多次调用此方法。

如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40。
还可以使用更安全的sha256和sha512。
:::

## Hmac

Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
```bash
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex')); // 80f7e22570...
```
## AES
AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：

``` bash
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
```
::: tip 提示
使用 cipher.update() 和 cipher.final() 方法生成加密的数据。

注意到AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等，AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。
:::

## Diffie-Hellman
暂无
## RSA
暂无

### api链接

http://nodejs.cn/api/crypto.html#crypto_hash_copy_options