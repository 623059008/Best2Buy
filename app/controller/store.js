'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
    async queryStore() {
        const { ctx } = this;
        const data = await ctx.service.store.query({ filter: ctx.request.body });
        // console.log(`[controller.store.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async updateStore() {
        const { ctx } = this;
        const data = await ctx.service.store.update(ctx.request.body);
        // console.log(`[controller.store.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertStore() {
        const { ctx } = this;
        const data = await ctx.service.store.insert(ctx.request.body);
        // console.log(`[controller.store.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteStore() {
        const { ctx } = this;
        const data = await ctx.service.store.delete(ctx.request.body);
        // console.log(`[controller.store.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = StoreController;