import { fenbiTypeEnum } from "../../service/data";

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
    imgsrc = imgsrc.replace(/src=(?:"\s*([^"]*)\s*"|'\s*([^']*)\s*'|(\S+))/i, 'src="' + "https:" + '$1"');
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

(global as any).ziLiaoTimus = [];
// 资料分析大题渲染
handlebars.registerHelper("renderZiliaoTimu", function (timu) {
  const { fenbiType } = timu;
  if (fenbiType === fenbiTypeEnum.ziliao) {
    const cailiaoId = timu?.material?.id;
    if (!(global as any).ziLiaoTimus?.includes(cailiaoId)) {
      (global as any).ziLiaoTimus.push(cailiaoId);
      return timu?.material?.content;
    }
  }
  return null;
});

// let ziLiaoTimus: any = [];
// // 资料分析大题渲染
// handlebars.registerHelper("renderZiliaoTimu", function (timu) {
//   const { fenbiType } = timu;
//   if (fenbiType === fenbiTypeEnum.ziliao) {
//     // 当前材料id
//     const cailiaoId = timu?.material?.id;
//     // 已经存在的材料id
//     const existZiliaoIds = ziLiaoTimus?.map((en) => en?.id);

//     // console.log('当前题目id', timu?.id);
//     // console.log('当前材料id', cailiaoId);
//     // console.log('已经存在的材料id，是否包含当前材料id', existZiliaoIds, existZiliaoIds?.includes(cailiaoId));
//     if(!timu?.material) console.log('这个题目没有材料', timu?.id);
//     ziLiaoTimus.push(timu?.material);
//     if (!existZiliaoIds?.includes(cailiaoId)) {
//       if (ziLiaoTimus?.map((en) => en?.id)?.filter((_id) => _id === cailiaoId)?.length >= 4) {
//         ziLiaoTimus = ziLiaoTimus?.filter((en) => en?.id !== cailiaoId);
//       }
//       return `<div><h3>资料分析</h3>${timu?.material?.content}</div>`;
//     }
//   }
//   return null;
// });
