import { Service } from "egg";

/**
 * Crawler Api Service
 */
export class Crawler extends Service {
  Exercises: any;
  Subject: any;
  constructor(ctx) {
    super(ctx);
    this.Exercises = ctx.model.Exercises;
    this.Subject = ctx.model.Subject;
  }
  option = {
    dataType: "json",
    headers: {
      Cookie: this.config.fenbi.cookie,
    },
  };

  public async getSingleExercise(id: string) {
    const { data: { sheet } } = await this.ctx.curl(
      `https://tiku.fenbi.com/api/xingce/exercises/${id}?app=web&kav=100&av=100&hav=100&version=3.0.0.0`,
      this.option
    );
    this.getSubjects(sheet?.questionIds);
    try {
      await this.Exercises.create(sheet);
      // this.ctx.logger.info(re, data);
      return sheet;
    } catch (error) {
      this.ctx.logger.error(error);
    }
  }

  public async getSubjects(ids: number[]) {
    if (ids?.length) {
      const { data } = await this.ctx.curl(
        `https://tiku.fenbi.com/api/xingce/questions?ids=${ids?.join(",")}`,
        this.option
      );
      if (Array.isArray(data)) {
        await this.Subject.insertMany(data);
      }
    }
  }
}

export default Crawler;
