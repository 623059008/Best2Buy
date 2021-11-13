'use strict';

const Controller = require('egg').Controller;

class RecordController extends Controller {
  async queryRecord() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    if (!uid) {
      console.log(`[controller.record.queryRecord] ${JSON.stringify(ctx.request.body)}`);
      return { message: 'Invalid Parameters' };
    }
    const data = await ctx.service.record.queryRecord({ uid });
    console.log(`[controller.queryRecord.index] ${JSON.stringify(data)}`);
    return (ctx.body = { ...data });
  }
  async addRecord() {
    const { ctx } = this;
    const { uid, quizscore } = ctx.request.body;
    if (!uid || !quizscore) {
      console.log(`[controller.record.addRecord] ${JSON.stringify(ctx.request.body)}`);
      return { message: 'Invalid Parameters' };
    }
    const data = await ctx.service.record.insert({ uid, quizscore });
    console.log(`[controller.addRecord.index] ${JSON.stringify(data)}`);
    return (ctx.body = { ...data });
  }
}

module.exports = RecordController;
