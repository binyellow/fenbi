import { Controller } from "egg";
import fs from "fs";
import path from "path";
import { html_to_pdf } from "./pdf";

export default class CrawlerController extends Controller {
  public async getExercises() {
    const { ctx } = this;
    // id是卷子的id，例如湖南卷2023是 2202730411
    const { id } = ctx.query;

    const res = await ctx.service.crawler.getSingleExercise(id);
    ctx.body = res;
  }

  // 返回某个卷子id对应的所有题
  async getQuestionsByExercisesId() {
    const { ctx } = this;
    // id是卷子的id，例如湖南卷2023是 2202730411
    const { id, fenbiType } = ctx.query;

    const res = await ctx.service.crawler.getQuestionsByExercisesId(id, fenbiType);
    return res;
  }

  async download() {
    const { ctx } = this;

    let res;
    let html;
    const timu = await ctx.service.crawler.getQuestionsByExercisesId('2007718989');
    try {
      const dataBinding = {
        timu,
        total: 600,
        isWatermark: true,
      };

      const templateHtml = fs.readFileSync(path.join(__dirname, "invoice.html"), "utf8");

      const options = {
        format: "A4",
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "20px",
          bottom: "20px",
        },
        printBackground: true,
        path: "invoice.pdf",
        preferCSSPageSize: true,
      };

      [res, html] = await html_to_pdf({ templateHtml, dataBinding, options });

      // console.log("Done: invoice.pdf is created!", res, html);
    } catch (err) {
      console.log("ERROR:", err);
    }

    console.log('return==>', res?.length, html?.length);
    console.log(html);
    ctx.type = "application/pdf";
    ctx.body = res;
  }
}
