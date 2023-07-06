import { Service } from "egg";
import { typeIndex } from "./data";
import { genFilterByQIdsAndType, transQuery } from "../utils/crawlerParse";

/**
 * Crawler Api Service
 */
export class Crawler extends Service {
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

  // 爬取试卷paperId对应的 试卷信息
  // 未创建练习的case
  public async getSingleExercise(id: string) {
    const { data } = await this.ctx.curl(`${this.config.fenbi.exercisesUrl}`, {
      ...this.option,
      method: "POST",
      data: { paperId: id },
    });

    this.logger.info("爬取试卷id对应内容", data);

    const { sheet } = data;
    this.getSubjects(sheet?.questionIds, sheet?.chapters);
    try {
      await this.Exercises.updateOne({ id: data?.id }, { $set: data }, { upsert: true });
      // this.ctx.logger.info(re, data);
      return sheet;
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }

  // 通过练习id获取试卷信息
  // 已创建练习的case
  public async getSingleExistedExercise(id: string) {
    const { data } = await this.ctx.curl(`${this.config.fenbi.exercisesUrl}/${id}`, this.option);
    this.ctx.logger.info("通过练习id获取试卷信息", id, data);
    const { sheet } = data;
    this.getSubjects(sheet?.questionIds, sheet?.chapters);
    try {
      await this.Exercises.updateOne({ id: data?.id }, { $set: data }, { upsert: true });
      return sheet;
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }

  // 通过试卷id + 题型 筛选题目
  public async getQuestionsByExercisesId(id: string, fenbiType?: string) {
    const entity = await this.Exercises.findOne({ id });
    let questions;
    if (entity) {
      const { questionIds } = entity?.sheet;
      const filters = genFilterByQIdsAndType(questionIds, fenbiType);
      questions = await this.Questions.aggregate(filters);
    }
    return questions;
  }

  // 爬取questionIds对应的题目列表
  public async getSubjects(ids: number[], chapters) {
    // 记录每种题型的last index
    const typeArrEnd = chapters?.reduce((pre, cur, index) => {
      const last = pre?.[pre?.length - 1]?.value || 0;
      return [...pre, { value: last + cur?.questionCount, fenbiType: typeIndex[index] }];
    }, []);
    if (ids?.length) {
      const { data } = await this.ctx.curl(`${this.config.fenbi.subjectUrl}${ids?.join(",")}`, this.option);
      const syntheticData = data?.map((entity, index) => {
        const currentTypeRange = typeArrEnd.find((en) => index < en?.value);
        return {
          ...entity,
          fenbiType: currentTypeRange?.fenbiType,
        };
      });
      const operations = syntheticData.map((exercise) => ({
        updateOne: {
          filter: { id: exercise.id },
          update: { $set: exercise },
          upsert: true,
        },
      }));
      if (Array.isArray(syntheticData)) {
        await this.Questions.bulkWrite(operations);
      }
    }
  }

  // 获取某个省份的所有试卷
  async getPapers(id: string) {
    const { data } = await this.ctx.curl(`${this.config.fenbi.paperUrl}`, {
      ...this.option,
      data: {
        toPage: 0,
        pageSize: 30,
        labelId: id,
        app: "web",
        kav: 100,
        av: 100,
        hav: 100,
        version: "3.0.0.0",
      },
    });

    return data;
  }

  // 获取试卷-练习历史
  async getCategoryExercises() {
    const { data } = await this.ctx.curl(`${this.config.fenbi.categoryExercisesUrl}`, {
      ...this.option,
      data: {
        categoryId: 1,
        cursor: 60,
        count: 30,
        noCacheTag: 124,
        app: "web",
        kav: 100,
        av: 100,
        hav: 100,
        version: "3.0.0.0",
      },
    });

    return data;
  }

  // 获取试卷-练习历史
  async submitExercises(data) {
    return Promise.all(
      data?.datas?.map((exercise) => {
        this.ctx.logger.info("url", `${this.config.fenbi.submitExerciseUrl}${exercise?.id}/submit`, exercise?.score);
        if (exercise?.score !== undefined) return Promise.resolve();
        return this.ctx.curl(`${this.config.fenbi.submitExerciseUrl}${exercise?.id}/submit`, {
          ...this.option,
          method: "POST",
          data: {
            status: 1,
            app: "web",
            kav: 100,
            av: 100,
            hav: 100,
            version: "3.0.0.0",
          },
        });
      })
    );
  }

  // 获取没有省、年的数据
  async getNullData() {
    return this.Exercises.find({ year: { $exists: false } });
    // return this.Exercises.find({ $or: [{ province: { $exists: false } }, { year: { $exists: false } }] });
  }

  // 按照省、年、体型筛选
  async getData(query) {
    const { fenbiType, ...rest } = query;
    const queryFields = transQuery(rest);
    this.ctx.logger.info("查询字段", queryFields);
    const exercises = await this.Exercises.find(queryFields);

    let questions = exercises;
    if (exercises && fenbiType !== undefined) {
      const questionIds = exercises?.reduce((pre, cur) => {
        return [...pre, ...cur?.sheet?.questionIds];
      }, []);
      this.ctx.logger.info("题目ids", questionIds);
      const filters = genFilterByQIdsAndType(questionIds, fenbiType);
      questions = await this.Questions.aggregate(filters);
      this.logger.info(questions?.length, questionIds?.length);
    }
    return questions;
  }
}

export default Crawler;
