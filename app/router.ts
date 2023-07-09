import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect("/", "/news");
  router.get("/news", controller.news.list);
  router.get("/crawler", controller.crawler.getExercises);
  // 获取某个考试id 对应所有的题目
  router.get("/getQuestionsByExercisesId", controller.crawler.getQuestionsByExercisesId);
  // 获取省份对应试卷列表
  router.get("/getPapers", controller.crawler.getPapers);
  // 提交未完成的试卷
  router.get("/submitExercises", controller.crawler.submitExercises);
  // 查找没有省 || 年的数据
  router.get("/getNullData", controller.crawler.getNullData);
  // 获取数据，现在其实内部是下载试卷
  router.get("/getData", controller.crawler.getData);
  // 根据年、省、题型获取数据
  router.get("/getSimpleData", controller.crawler.getSimpleData);
  // 填充省市 & 年份
  router.get("/fillYearAndProvince", controller.crawlerParse.fillYearAndProvince);
  // 通过题目内容查询对应的试卷
  router.get("/findExercisesByQuestionContent", controller.crawlerParse.findExercisesByQuestionContent);
  // 修正某个试卷的题型
  router.get("/fixQuestionType", controller.crawlerParse.fixQuestionType);
  // 修正所有试卷
  router.get("/fixAllQuestionType", controller.crawlerParse.fixAllQuestionType);
  // 查询年份
  router.get("/getYearProvinces", controller.crawler.getYearProvinces);

  router.get("/download", controller.crawler.download);
  router.get("/news/item/:id", controller.news.detail);
  router.get("/news/user/:id", controller.news.user);
};
