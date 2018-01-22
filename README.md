# gulp-fez-tinypic

整合 [TinyPNG](https://tinypng.com/) 对图片做深度无损压缩。

## Installation
```
npm install --save-dev gulp-fez-tinypic
```

## Usage

```js
var gulp = require('gulp');
var tinify = require('gulp-fez-tinypic');

gulp.task('tinypic', function() {
    gulp.src('/img/**/*')
        .pipe(tinify('TinyAPIKey'))
        .pipe(gulp.dest('/dest/img'));
});
```

> 本插件必须先申请 [TinyPNG Developer API Key](https://tinypng.com/developers) 才能使用.

## 相关说明

[Tinypng](https://tinypng.com/) 是一款 PNG/JPG 图片压缩工具，拥有非常牛X的算法，压缩率能达到 50% 以上，图片在压缩之前和之后几乎看不出差别。

> Tinypng 在设计师人群中比较流行，它的原理是通过合并图片中相似的颜色，通过将 24 位的 PNG 图片压缩成小得多的 8 位色值的图片，并且去掉了图片中不必要的 metadata（元数据，从 Photoshop 等工具中导出的图片都会带有此类信息），这种方式几乎能完美支持原图片的透明度。

Tinypng可以[在线使用](https://tinypng.com/)，还可以通过其提供的 [PhotoShop 插件](https://tinypng.com/photoshop)来导出图片，$50 美刀的价格也略贵(好东西都是收费的)，Tinypng 提供了 HTTP API，使用之前需要先申请 key，免费版每月可以处理 500 张图片，对于一般项目来说够用了。
