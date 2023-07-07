import { Service } from "egg";
import { fillYearAndProvince2 } from "../utils/crawlerParse";
import { genChapterTypesRange } from "../utils/crawler";

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

  // 通过题目内容查询对应的试卷
  public async findExercisesByQuestionContent(query) {
    const { content } = query;
    try {
      const q = await this.Questions.findOne({ content: { $regex: content } });
      const e = await this.Exercises.find({ "sheet.questionIds": q?.id });
      return { q, e };
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }

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

      this.logger.info("转换的数据", JSON.stringify(operations));
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

  // 修正某个试卷的题型
  public async fixQuestionType(query) {
    const { id } = query;
    try {
      const e = await this.Exercises.findOne({ id });
      const typeArrEnd = genChapterTypesRange(e?.sheet?.chapters);
      const syntheticData = e?.sheet?.questionIds?.map((id, index) => {
        const currentTypeRange = typeArrEnd.find((en) => index < en?.value);
        return {
          id,
          fenbiType: currentTypeRange?.fenbiType,
        };
      });

      let bulkUpdateOps: any = [];
      syntheticData.forEach((data) => {
        const filter = { id: data.id };
        const update = { $set: { fenbiType: data.fenbiType } };
        bulkUpdateOps.push({
          updateOne: {
            filter,
            update,
          },
        });
      });

      const updateRes = await this.Questions.bulkWrite(bulkUpdateOps);
      this.logger.info(updateRes);

      return { updateRes, typeArrEnd, e };
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }
}

export default CrawlerParse;
