'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
    async queryProduct() {
        const { ctx } = this;
        const data = await ctx.service.product.query({ filter: ctx.request.body });
        // console.log(`[controller.product.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
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
}

module.exports = ProductController;