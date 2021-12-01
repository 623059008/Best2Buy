// app/service/inventoryistrator.js

'use strict';

const Service = require('egg').Service;

class InventoryService extends Service {
  async find(data) {
    const { StoreID, ProductID } = data;
    // select user info from inventory by username and password
    let inventory;
    if (StoreID && ProductID) {
      inventory = await this.app.mysql.query('select * from inventory where StoreID = ? and ProductID = ?', [ StoreID, ProductID ]);
    } else {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info1',
      };
    }
    console.log(`[service.inventory.find] DB: ${StoreID, ProductID} result: ${JSON.stringify(StoreID, ProductID)}`);
    if (!inventory) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info2',
      };
    }
    return {
      data: inventory[0],
      success: true,
    };
  }
  async query(data) {
    const { filter = {} } = data || {};
    // select user info from inventory by username and password
    let sql = 'select * from inventory where';
    if (filter.StoreID) {
      sql += ' StoreID = ' + filter.StoreID + ' and';
    }
    if (filter.ProductID) {
      sql += ' ProductID = ' + filter.ProductID + ' and';
    }
    let filterNum = 0;
    for (const i in filter) {
      filterNum++;
    }
    if (filterNum === 0) {
      sql = 'select * from inventory';
    } else {
      sql = sql.substr(0, sql.length - 4);
    }
    console.log(`[service.inventory.query] DB: ${JSON.stringify(filter)} ${sql}`);
    const inventory = await this.app.mysql.query(sql);

    // console.log(`[service.inventory.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(inventory)}`);
    if (!inventory) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    return {
      data: inventory,
      success: true,
    };
  }

  async insert(data) {
    const { StoreID, ProductID, NumberOfProduct } = data;
    const product = await this.app.mysql.query('select * from products where ProductID = ?', [ ProductID ]);
    if (!product || product.length !== 1) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because there is no such product',
      };
    }
    const { InventoryAmount } = product[0] || {};
    if (parseInt(NumberOfProduct) > InventoryAmount) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because the amout is over limit',
      };
    }

    const res = await this.app.mysql.query('insert into inventory (StoreID, ProductID, NumberOfProduct) value (?,?,?)', [ StoreID, ProductID, NumberOfProduct ]);
    console.log('[DB][service.inventory.insert]', res);
    if (!res) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to insert',
      };
    }
    return { success: true, ...res };
  }

  async delete(data) {
    const { StoreID, ProductID } = data;
    const res = await this.app.mysql.query('delete from inventory where StoreID = ? and ProductID = ?', [ StoreID, ProductID ]);
    if (!res) {
      return {
        success: false,
        errno: 1020,
        msg: 'fail to delete',
      };
    }
    return { success: true };
  }

  async update(data) {
    const inventory = await this.find(data);
    const { StoreID, ProductID, NumberOfProduct } = inventory.data;
    if (!inventory || !inventory.success) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because there is no such inventory',
      };
    }
    const product = await this.app.mysql.query('select * from products where ProductID = ?', [ ProductID ]);
    if (!product || product.length !== 1) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because there is no such product',
      };
    }
    const { InventoryAmount } = product[0] || {};
    
    const nowInv = await this.app.mysql.query('select * from inventory where ProductID = ? and StoreID <> ?', [ ProductID, StoreID ]);
    let cul = 0;
    if (!nowInv) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because there is no such inventory',
      };
    }
    nowInv.forEach(item => {
      cul += parseInt(item.NumberOfProduct, 10);
    });
    console.log(`[service.inventory.update] upper:${InventoryAmount}, cul: ${cul}, update: ${data.NumberOfProduct}`);
    if ((cul + parseInt(data.NumberOfProduct)) > InventoryAmount) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update because inventory amount is over the total inventory amount',
      };
    }

    const res = await this.app.mysql.update('inventory', {
      StoreID: data.StoreID || StoreID,
      ProductID: data.ProductID || ProductID,
      NumberOfProduct: data.NumberOfProduct === 0 ? data.NumberOfProduct : (data.NumberOfProduct || NumberOfProduct),
    }, {
      where: {
        StoreID: data.StoreID,
        ProductID: data.ProductID,
      },
    });
    if (!res) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    console.log(`[service.inventory.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
    return { success: true, data: { ...inventory, ...data } };
  }
}

module.exports = InventoryService;
