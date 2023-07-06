import { Controller } from "egg";
import fs from "fs";
import path from "path";
import { html_to_pdf } from "./pdf";
import { fenbiTypeEnum } from "../service/data";

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
    ctx.body = res;
  }

  // 提交未完成的试卷
  async submitExercises() {
    const { ctx } = this;

    const data = await ctx.service.crawler.getCategoryExercises();
    const res = await ctx.service.crawler.submitExercises(data);
    return (ctx.body = res);
  }

  // 获取某个省份的所有试卷
  async getPapers() {
    const { ctx } = this;
    // id是省份的唯一标识，labelId
    const { id } = ctx.query;

    const res = await ctx.service.crawler.getPapers(id);
    const { list } = res;
    await Promise.allSettled(
      list?.map((paper) => {
        // 如果已创建练习，则通过练习id获取
        if (paper?.exercise?.id) {
          this.ctx.logger.info(`${paper?.exercise?.id}-已创建练习`);
          return ctx.service.crawler.getSingleExistedExercise(paper?.exercise?.id);
        }
        this.ctx.logger.info(`${paper?.id}-未创建练习`);
        return ctx.service.crawler.getSingleExercise(paper?.id);
      })
    ).then(() => {
      this.ctx.logger.info(`${id}-该省所有试卷已爬完`);
    });

    return (ctx.body = res);
  }

  async download(oTimu) {
    const { ctx } = this;

    let res;
    let html;
    const timu = oTimu || await ctx.service.crawler.getQuestionsByExercisesId("2203045001", fenbiTypeEnum.changshi + "");
    // const timu = await ctx.service.crawler.getQuestionsByExercisesId("2007718989", "2");

    // console.log(timu);
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
    } catch (err) {
      this.ctx.logger.error(err, res, html);
    }

    // console.log("return==>", res?.length, html?.length);
    // console.log(html);
    (global as any).ziLiaoTimus = [];
    ctx.type = "application/pdf";
    ctx.body = res;
  }

  // 获取没有省、年的数据
  async getNullData() {
    const { ctx } = this;

    const res = await ctx.service.crawler.getNullData();

    ctx.body = res;
  }

  // 按照省、年、体型筛选
  async getData() {
    const { ctx } = this;

    const res = await ctx.service.crawler.getData(ctx.query);

    return await this.download(res);
  }
}
