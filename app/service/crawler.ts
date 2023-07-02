import { Service } from "egg";
import { typeIndex } from "./data";

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

  public async getSingleExercise(id: string) {
    const { data } = await this.ctx.curl(`${this.config.fenbi.exercisesUrl}${id}`, this.option);
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
      console.log(syntheticData, JSON.stringify(typeArrEnd));
      const operations = syntheticData.map(exercise => ({
        updateOne: {
          filter: { id: exercise.id },
          update: { $set: exercise },
          upsert: true
        }
      }));
      if (Array.isArray(syntheticData)) {
        await this.Questions.bulkWrite(operations);
      }
    }
  }
}

export default Crawler;
