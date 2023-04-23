import { Controller } from "egg";
const PDFDocument = require("pdfkit/js/pdfkit.standalone.js");
import fs from 'fs';
import path from 'path';

export default class CrawlerController extends Controller {
  public async getExercises() {
    const { ctx } = this;
    const { id } = ctx.query;

    const res = await ctx.service.crawler.getSingleExercise(id);
    ctx.body = res;
  }

  async download() {
    // 创建 PDF 文件
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("output.pdf"));
    // 添加文本内容
    doc.fontSize(16).text("Hello World!", 100, 100);
    // 结束文件
    doc.end();

    // 读取文件并发送至客户端下载
    const file = path.resolve(__dirname, "../../output.pdf");
    const filename = "myPDF.pdf";
    this.ctx.set("Content-disposition", `attachment;filename=${filename}`);
    this.ctx.set("Content-Type", "application/pdf");
    this.ctx.body = fs.createReadStream(file);
  }
}
