'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
    async queryProduct() {
        const { ctx } = this;
        const data = await ctx.service.product.query({ filter: ctx.request.body });
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async queryDetail() {
        const {ctx} = this;
        const data = await ctx.service.product.queryDetail({filter: ctx.request.body});
        console.log(`[controller.product.queryDetail] params: ${JSON.stringify(ctx.request.body)} res: ${JSON.stringify(data)}` );
        return (ctx.body={...data});
    }

    async updateProduct() {
        const { ctx } = this;
        const data = await ctx.service.product.update(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertProduct() {
        const { ctx } = this;
        const data = await ctx.service.product.insert(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteProduct() {
        const { ctx } = this;
        const data = await ctx.service.product.delete(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    //query total sales and profit of given product
    async querySalesInfo() {
        const { ctx } = this;
        const data = await ctx.service.product.querySAndP(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // rank products by sales volumn
    async rankByV() {
        const { ctx } = this;
        const data = await ctx.service.product.rankByV(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // rank products by porfit
    async rankByP() {
        const { ctx } = this;
        const data = await ctx.service.product.rankByP(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // query business customer by profit
    async queryBCByP() {
        const { ctx } = this;
        const data = await ctx.service.product.queryBCByP(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    // query business customer by sales volumn
    async rankByVOB() {
        const { ctx } = this;
        const data = await ctx.service.product.rankByVOB(ctx.request.body);
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = ProductController;