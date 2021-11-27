'use strict';

const Controller = require('egg').Controller;
const { v4: uuidv4 } = require('uuid');

class AdminController extends Controller {
    async findAdmin() {
        const { ctx } = this;
        const { CustomerID } = ctx.request.body;
        const data = await ctx.service.admin.find({ CustomerID });
        console.log(`[controller.admin.index] ${JSON.stringify(data)}`);
        ctx.cookies.set('user-cookie', uuidv4());
        return (ctx.body = {...data });
    }

    async signin() {
        const { ctx } = this;

        const { Password, Email } = ctx.request.body;
        if (!Password || !Email) {
            console.log(`[controller.admin.signin] ${JSON.stringify(ctx.request.body)}`);
            return (ctx.body = { message: 'Invalid Parameters' });
        }
        const data = await ctx.service.admin.signin({ Password, Email });
        console.log(`[controller.admin.signin] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async signup() {
        const { ctx } = this;
        const data = await ctx.service.admin.insert({...ctx.request.body });
        console.log(`[controller.admin.signup] ${JSON.stringify(data)}`);
        ctx.cookies.set('user-cookie', uuidv4());
        return (ctx.body = {...data });
    }

    async deleteUsr() {
        const { ctx } = this;
        const data = await ctx.service.admin.delete(ctx.request.body);
        return (ctx.body = {...data });
    }
}

module.exports = AdminController;