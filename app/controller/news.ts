import { Controller } from "egg";

export default class NewsController extends Controller {
  public async list() {
    const { ctx } = this;

    const exercises = await ctx.model.Exercises.aggregate([
      {
        $lookup: {
          from: "subjects", // from table
          localField: "questionIds", // localField
          foreignField: "id",
          as: "subjectsArr",
        },
      },
    ]);
    ctx.logger.info(exercises);
    // return exercises;
    ctx.body = exercises;
  }

  public async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    const newsInfo = await ctx.service.news.getItem(id);
    // get comment parallel
    const commentList = await Promise.all(newsInfo.kids.map((_id) => ctx.service.news.getItem(_id)));
    await ctx.render("news/detail.tpl", { item: newsInfo, comments: commentList });
  }

  public async user() {
    const { ctx } = this;
    const id = ctx.params.id;
    const userInfo = await ctx.service.news.getUser(id);
    await ctx.render("news/user.tpl", { user: userInfo });
  }
}
