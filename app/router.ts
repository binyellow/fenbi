import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect('/', '/news');
  router.get('/news', controller.news.list);
  router.get('/crawler', controller.crawler.getExercises);
  // 获取某个考试id 对应所有的题目
  router.get('/getQuestionsByExercisesId', controller.crawler.getQuestionsByExercisesId);
  // 获取省份对应试卷列表
  router.get('/getPapers', controller.crawler.getPapers);
  // 提交未完成的试卷
  router.get('/submitExercises', controller.crawler.submitExercises);
  // 查找没有省 || 年的数据
  router.get('/getNullData', controller.crawler.getNullData);
  router.get('/getData', controller.crawler.getData);
  // 填充省市 & 年份
  router.get('/fillYearAndProvince', controller.crawlerParse.fillYearAndProvince);
  router.get('/download', controller.crawler.download);
  router.get('/news/item/:id', controller.news.detail);
  router.get('/news/user/:id', controller.news.user);
};
