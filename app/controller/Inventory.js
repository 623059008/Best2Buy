'use strict';

const Controller = require('egg').Controller;

class InventoryController extends Controller {
    async queryInventory() {
        const { ctx } = this;
        const data = await ctx.service.inventory.query({ filter: ctx.request.body });
        // console.log(`[controller.inventory.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async updateInventory() {
        const { ctx } = this;
        const data = await ctx.service.inventory.update(ctx.request.body);
        // console.log(`[controller.inventory.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async insertInventory() {
        const { ctx } = this;
        const data = await ctx.service.inventory.insert(ctx.request.body);
        // console.log(`[controller.inventory.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }

    async deleteInventory() {
        const { ctx } = this;
        const data = await ctx.service.inventory.delete(ctx.request.body);
        // console.log(`[controller.inventory.index] ${JSON.stringify(data)}`);
        return (ctx.body = {...data });
    }
}

module.exports = InventoryController;