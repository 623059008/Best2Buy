'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/admin', controller.admin.findAdmin);
  router.post('/signin', controller.admin.signin);
  router.post('/signup', controller.admin.signup);
  router.post('/quiz', controller.quiz.queryQuiz);
  router.post('/record', controller.record.queryRecord);
  router.post('/addRecord', controller.record.addRecord);
};
