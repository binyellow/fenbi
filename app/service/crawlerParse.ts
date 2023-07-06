import { Service } from "egg";
import { fillYearAndProvince2 } from "../utils/crawlerParse";

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
    const regex = new RegExp(province);
    try {
      const res = await this.Exercises.find({ province: { $regex: regex } });
      const operations = fillYearAndProvince2(res, province).map((exercise) => {
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

      this.logger.info('转换的数据', JSON.stringify(operations))
      if (Array.isArray(operations)) {
        const updateRes = await this.Exercises.bulkWrite(operations);
        this.logger.info(updateRes?.result);
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
