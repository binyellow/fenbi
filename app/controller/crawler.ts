import { Controller } from "egg";
import fs from "fs";
import path from "path";
import { html_to_pdf } from "./pdf";
import { timu } from "./timu";

export default class CrawlerController extends Controller {
  public async getExercises() {
    const { ctx } = this;
    // id是卷子的id，例如湖南卷2023是 2202730411
    const { id } = ctx.query;

    const res = await ctx.service.crawler.getSingleExercise(id);
    ctx.body = res;
  }

  async download() {
    const { ctx } = this;

    let res;
    let html;
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
          top: "40px",
          bottom: "100px",
        },
        printBackground: true,
        path: "invoice.pdf",
      };

      [res, html] = await html_to_pdf({ templateHtml, dataBinding, options });

      console.log("Done: invoice.pdf is created!", res);
    } catch (err) {
      console.log("ERROR:", err);
    }

    console.log('return==>');
    // ctx.type = "application/pdf";
    ctx.body = html;
  }
}
