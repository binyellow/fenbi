const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

handlebars.registerHelper("array", function () {
  return Array.from(arguments).slice(0, -1);
});
handlebars.registerHelper("inc", function (num) {
  return num + 1;
});
// 补全https
handlebars.registerHelper("replaceImgSrc", function (src) {
  var imgreg = /<img.*?>/gi;
  return src.replace(imgreg, function (imgsrc) {
    imgsrc = imgsrc.replace(/src=(?:"\s*([^"]*)\s*"|'\s*([^']*)\s*'|(\S+))/i, 'src="' + 'https:' + '$1"');
    return imgsrc;
  });
});

export const html_to_pdf = async ({ templateHtml, dataBinding, options }) => {
  const template = handlebars.compile(templateHtml);
  const html = template(dataBinding);
  const finalHtml = encodeURIComponent(html);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
    waitUntil: "networkidle0",
  });

  let pdfBuffer = await page.pdf(options); // based on = pdf(options?: PDFOptions): Promise<Buffer>; from https://pptr.dev/api/puppeteer.page.pdf pdfBuffer will stored the PDF file Buffer content when "path is not provoded"
  await browser.close();
  return [pdfBuffer, html]; // Returning the value when page.pdf promise gets resolved
};
