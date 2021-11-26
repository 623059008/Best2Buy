'use strict';

const Controller = require('egg').Controller;

class SalesPersonController extends Controller {
    async querySalesPerson() {
        const { ctx } = this;
        const data = await ctx.service.salesperson.query({ filter: ctx.request.body });
        // console.log(`[controller.salesperson.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async updateSalesPerson() {
        const { ctx } = this;
        const data = await ctx.service.salesperson.update(ctx.request.body);
        // console.log(`[controller.salesperson.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertSalesPerson() {
        const { ctx } = this;
        const data = await ctx.service.salesperson.insert(ctx.request.body);
        // console.log(`[controller.salesperson.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteSalesPerson() {
        const { ctx } = this;
        const data = await ctx.service.salesperson.delete(ctx.request.body);
        // console.log(`[controller.salesperson.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = SalesPersonController;