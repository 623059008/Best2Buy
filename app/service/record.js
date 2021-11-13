// app/service/quiz.js

'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
  async queryRecord(data) {
    const { uid } = data;
    if (!uid) {
      return {
        success: false,
        errno: 9999,
        msg: 'Invalid Parameters',
      };
    }
    // select user info from admin by username and password
    const res = await this.app.mysql.select('record', { where: { userid: uid } });
    if (!res) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    console.log(`[service.res.insert] DB: ${JSON.stringify({ uid })}, result: ${JSON.stringify(res)}`);
    return {
      data: res,
      success: true,
    };
  }

  /**
   * insert a new record to admin
   * @param {object} data admin info {username, password, realname, email}
   */
  async insert(data) {
    // create a new admin
    const { uid, quizscore } = data;
    const timestamp = new Date().getTime();
    const res = await this.app.mysql.insert('record', { userid: uid, quizscore, timestamp });
    console.log(`[service.admin.insert] DB: ${JSON.stringify({ uid, quizscore, timestamp })}, result: ${JSON.stringify(res)}`);
    if (!res) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to insert',
      };
    }
    return { success: true, res };
  }
}

module.exports = RecordService;
