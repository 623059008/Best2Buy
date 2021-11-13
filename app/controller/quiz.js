'use strict';

const Controller = require('egg').Controller;

class QuizController extends Controller {
  async queryQuiz() {
    const { ctx } = this;
    const { count = 10 } = ctx.request.body;
    const data = await ctx.service.quiz.queryQuiz({ count });
    console.log(`[controller.home.index] ${JSON.stringify(data)}`);
    return (ctx.body = { ...data });
  }
}

module.exports = QuizController;
