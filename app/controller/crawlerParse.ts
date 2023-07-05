import { Controller } from "egg";

export default class CrawlerParseController extends Controller {
  // 填充省市
  public async fillYearAndProvince() {
    const { ctx } = this;

    const res = await ctx.service.crawlerParse.fillYearAndProvince(ctx?.query?.province);
    ctx.body = res;
  }
}
