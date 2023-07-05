import { Service } from "egg";
import { fillYearAndProvince1 } from "../utils/crawlerParse";

/**
 * CrawlerParse Api Service
 */
export class CrawlerParse extends Service {
  Exercises: any;
  Questions: any;
  constructor(ctx) {
    super(ctx);
    this.Exercises = ctx.model.Exercises;
    this.Questions = ctx.model.Questions;
  }
  option = {
    dataType: "json",
    headers: {
      Cookie: this.config.fenbi.cookie,
    },
  };

  // 填充省市
  public async fillYearAndProvince(province = "湖南") {
    this.logger.info("开始填充缺少的省&年份");

    const regex = new RegExp(province);
    try {
      const res = await this.Exercises.find({ province: { $regex: regex } });
      const operations = fillYearAndProvince1(res).map((exercise) => {
        // 需要单独update部分属性，否则会认为相比于原文档没有更新
        const { year, province, id } = exercise;
        return {
          updateOne: {
            filter: { id: id },
            update: { $set: { year, province } },
            upsert: true,
          },
        };
      });

      if (Array.isArray(operations)) {
        const updateRes = await this.Exercises.bulkWrite(operations);
        this.logger.info(updateRes);
      }
      return res?.map((en) => {
        const { sheet, id, year, province } = en;
        return {
          id,
          year,
          province,
          name: sheet?.name,
        };
      });
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }
}

export default CrawlerParse;
