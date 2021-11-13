// app/service/quiz.js

'use strict';

const Service = require('egg').Service;

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [ array[currentIndex], array[randomIndex] ] = [
      array[randomIndex], array[currentIndex] ];
  }

  return array;
}

class QuizService extends Service {
  async queryQuiz(data) {
    const { count = 10 } = data;
    if (!count) {
      return {
        success: false,
        errno: 9999,
        msg: 'Invalid Parameters',
      };
    }
    // select user info from admin by username and password
    const queryQuiz = await this.app.mysql.select('quiz');
    if (!queryQuiz) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    console.log(`[service.queryQuiz.insert] DB: ${JSON.stringify({ count })}, result: ${JSON.stringify(queryQuiz)}`);
    const dataList = shuffle(queryQuiz);
    const resList = dataList.splice(0, Math.min(dataList.length, count));
    return {
      data: resList,
      success: true,
    };
  }
}

module.exports = QuizService;
