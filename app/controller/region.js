'use strict';

const Controller = require('egg').Controller;

class RegionController extends Controller {
    async queryRegion() {
        const { ctx } = this;
        const data = await ctx.service.region.query({ filter: ctx.request.body });
        // console.log(`[controller.region.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async updateRegion() {
        const { ctx } = this;
        const data = await ctx.service.region.update(ctx.request.body);
        // console.log(`[controller.region.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertRegion() {
        const { ctx } = this;
        const data = await ctx.service.region.insert(ctx.request.body);
        // console.log(`[controller.region.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteRegion() {
        const { ctx } = this;
        const data = await ctx.service.region.delete(ctx.request.body);
        // console.log(`[controller.region.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // rank region by sales volumn
    async rankByVOR() {
        const { ctx } = this;
        const data = await ctx.service.region.rankByVOR(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // rank region by profit
    async rankByPOR() {
        const { ctx } = this;
        const data = await ctx.service.region.rankByPOR(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = RegionController;