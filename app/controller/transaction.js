'use strict';

const Controller = require('egg').Controller;

class TransactionController extends Controller {
    async queryTransaction() {
        const { ctx } = this;
        const data = await ctx.service.transaction.query({ filter: ctx.request.body });
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async updateTransaction() {
        const { ctx } = this;
        const data = await ctx.service.transaction.update(ctx.request.body);
        // console.log(`[controller.transaction.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertTransaction() {
        const { ctx } = this;
        const data = await ctx.service.transaction.insert(ctx.request.body);
        // console.log(`[controller.transaction.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteTransaction() {
        const { ctx } = this;
        const data = await ctx.service.transaction.delete(ctx.request.body);
        // console.log(`[controller.transaction.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = TransactionController;