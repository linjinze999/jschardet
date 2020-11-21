JsChardet
=========
> 在 [jschardet](https://github.com/aadsm/jschardet) 基础上添加了 `GBK` 识别。

License
-------

LGPL

How To Use It
-------------

### Node
```   
npm install jschardet
```

    var jschardet = require("jschardet")

    // "àíàçã" in UTF-8
    jschardet.detect("\xc3\xa0\xc3\xad\xc3\xa0\xc3\xa7\xc3\xa3")
    // { encoding: "UTF-8", confidence: 0.9690625 }

    // "次常用國字標準字體表" in Big5
    jschardet.detect("\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed")
    // { encoding: "Big5", confidence: 0.99 }

### Browser
Copy and include [jschardet.min.js](https://github.com/linjinze999/jschardet/tree/master/dist/jschardet.min.js) in your web page.

Options
-------

```javascript
// See all information related to the confidence levels of each encoding.
// This is useful to see why you're not getting the expected encoding.
jschardet.enableDebug();

// Default minimum accepted confidence level is 0.20 but sometimes this is not
// enough, specially when dealing with files mostly with numbers.
// To change this to 0 to always get something or any other value that can
// work for you.
jschardet.detect(str, { minimumThreshold: 0 });
```

Supported Charsets
------------------

* Big5, GB2312/GB18030, EUC-TW, HZ-GB-2312, and ISO-2022-CN (Traditional and Simplified Chinese)
* EUC-JP, SHIFT_JIS, and ISO-2022-JP (Japanese)
* EUC-KR and ISO-2022-KR (Korean)
* KOI8-R, MacCyrillic, IBM855, IBM866, ISO-8859-5, and windows-1251 (Russian)
* ISO-8859-2 and windows-1250 (Hungarian)
* ISO-8859-5 and windows-1251 (Bulgarian)
* windows-1252
* ISO-8859-7 and windows-1253 (Greek)
* ISO-8859-8 and windows-1255 (Visual and Logical Hebrew)
* TIS-620 (Thai)
* UTF-32 BE, LE, 3412-ordered, or 2143-ordered (with a BOM)
* UTF-16 BE or LE (with a BOM)
* UTF-8 (with or without a BOM)
* ASCII
* GBK

Technical Information
---------------------

I haven't been able to create tests to correctly detect:

* ISO-2022-CN
* windows-1250 in Hungarian
* windows-1251 in Bulgarian
* windows-1253 in Greek
* EUC-CN

Development
-----------
Use `npm run dist` to update the distribution files. They're available at https://github.com/linjinze999/jschardet/tree/master/dist.

Authors
-------

Add GBK from [jschardet](https://github.com/aadsm/jschardet) by linjinze999 (https://github.com/linjinze999/jschardet)
