'use strict';

const Controller = require('egg').Controller;
const { v4: uuidv4 } = require('uuid');

class AdminController extends Controller {
  async findAdmin() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    const data = await ctx.service.admin.find({ uid });
    console.log(`[controller.admin.index] ${JSON.stringify(data)}`);
    ctx.cookies.set('user-cookie', uuidv4());
    return (ctx.body = { ...data });
  }

  async signin() {
    const { ctx } = this;

    const { birthday, email, realname } = ctx.request.body;
    if (!birthday || !email || !realname) {
      console.log(`[controller.admin.signin] ${JSON.stringify(ctx.request.body)}`);
      return (ctx.body = { message: 'Invalid Parameters' });
    }
    const data = await ctx.service.admin.find({ birthday, email, realname });
    console.log(`[controller.admin.signin] ${JSON.stringify(data)}`);
    return (ctx.body = { ...data });
  }

  async signup() {
    const { ctx } = this;
    const { birthday, email, realname } = ctx.request.body;
    if (!birthday || !email || !realname) {
      console.log(`[controller.admin.signup] ${JSON.stringify(ctx.request.body)}`);
      return (ctx.body = { message: 'Invalid Parameters' });
    }
    const data = await ctx.service.admin.insert({ birthday, email, realname });
    console.log(`[controller.admin.signup] ${JSON.stringify(data)}`);
    ctx.cookies.set('user-cookie', uuidv4());
    return (ctx.body = { ...data });
  }
}

module.exports = AdminController;
