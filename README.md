## 问题

1. [更换成这个库](https://github.com/chuongtrh/html_to_pdf)
   1. [pdfmake 怎么使用自定义字体](https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/vfs/)
      - [x] 主要是要执行`node build-vfs.js "./examples/fonts"`
   2. 如何 renderHtml2PdfMake
   - [x] 换了一个库，[但是碰到 flex 不生效问题，需要转换成 webkit 前缀](https://github.com/marcbachmann/node-html-pdf/issues/24#:~:text=https%3A//autoprefixer.github.io/)
2. Handlebars 的三个大括号语法，解决 img 标签渲染问题
3. 使用 lookup 帮助方法和一个字符数组来实现将索引值映射为 A、B、C、D 等字符，需要自己构造 arr

   ```js
   handlebars.registerHelper("array", function () {
     return Array.from(arguments).slice(0, -1);
   });

   <!-- 然后才可以在模板中使用 -->
   {{lookup (array 'A' 'B' 'C' 'D') @index}}
   ```
4. [JS补全https协议](https://blog.csdn.net/gao_shao_liang/article/details/40426857)
