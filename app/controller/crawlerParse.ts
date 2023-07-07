import { Controller } from "egg";

export default class CrawlerParseController extends Controller {
  // 填充省市
  public async fillYearAndProvince() {
    const { ctx } = this;

    const res = await ctx.service.crawlerParse.fillYearAndProvince(ctx?.query?.province);
    ctx.body = res;
  }

  // 通过题目内容查询对应的试卷
  public async findExercisesByQuestionContent() {
    const { ctx } = this;
    const res = await ctx.service.crawlerParse.findExercisesByQuestionContent(ctx?.query);
    ctx.body = res;
  }

  // 修正某个试卷的题型
  public async fixQuestionType() {
    const { ctx } = this;
    const res = await ctx.service.crawlerParse.fixQuestionType(ctx?.query);
    ctx.body = res;
  }
}
