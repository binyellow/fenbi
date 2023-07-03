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
  router.get('/download', controller.crawler.download);
  router.get('/news/item/:id', controller.news.detail);
  router.get('/news/user/:id', controller.news.user);
};
