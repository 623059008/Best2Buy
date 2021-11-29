// app/service/quiz.js

'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
  async query(data) {
    const { filter = {} } = data || {};
    // select user info from transaction by username and password
    let sql = 'select * from transactions where';
    if (filter.ProductKind) {
      sql += " ProductKind='" + filter.ProductKind + "' and";
    }
    if (filter.ProductsName) {
      sql += " ProductsName like '%" + filter.ProductsName + "%' and";
    }
    if (filter.OrderNumber) {
      sql += ' OrderNumber = ' + filter.OrderNumber + ' and';
    }
    if (filter.CustomerID) {
      sql += ' CustomerID =' + filter.CustomerID + ' and';
    }
    let filterNum = 0;
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        filterNum++;
      }
    });
    if (filterNum === 0) {
      sql = 'select * from transactions';
    } else {
      sql = sql.substr(0, sql.length - 4);
    }
    console.log(
      `[service.transaction.query] DB: ${JSON.stringify(filter)} ${sql}`
    );
    const transaction = await this.app.mysql.query(sql);

    // console.log(`[service.transaction.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(transaction)}`);
    if (!transaction) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    return {
      data: transaction,
      success: true,
    };
  }

  async insert(data) {
    const {
      ProductID,
      NumberOfProducts,
      CustomerID,
      StoreID,
      SalesPersonID,
    } = data;

    const invRes = await this.service.inventory.query({
      filter: { StoreID, ProductID },
    });
    const inventory = invRes.data[0] || {};
    const { NumberOfProduct } = inventory;
    // check whether have enough stock to sell
    if (NumberOfProduct < NumberOfProducts) {
      return {
        success: false,
        errno: 4001,
        errmsg:
          'We do not have enough stock to sell, please contact with sales person in this store',
      };
    }

    const productRes = await this.service.product.find({ ProductID });
    const product = productRes.data || {};
    const {
      ProductKind,
      Name: ProductsName,
      Price: ProductsPrice,
      InventoryAmount,
    } = product;
    console.log(
      `[service.transaction.insert] product:${JSON.stringify(product)}`
    );

    const TotalGrossIncome = (ProductsPrice * NumberOfProducts).toFixed(2);

    const salesPersonRes = await this.service.salesperson.query({
      filter: { SalesPersonID },
    });
    const saleperson = salesPersonRes.data[0] || {};
    const { Name: SalespersonName } = saleperson;

    console.log(
      `[service.transaction.insert] saleperson:${JSON.stringify(saleperson)}`
    );

    const Status = 'Pending';
    const now = new Date();
    const nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    // Process 1 Create transaction

    const res = await this.app.mysql.query(
      'insert into transactions ( Date, SalespersonName, ProductID, ProductKind, ProductsName, ProductsPrice, NumberOfProducts, TotalGrossIncome, CustomerID, Status) value (?,?,?,?,?,?,?,?,?,?)',
      [
        nowDate,
        SalespersonName,
        ProductID,
        ProductKind,
        ProductsName,
        ProductsPrice,
        NumberOfProducts,
        TotalGrossIncome,
        CustomerID,
        Status,
      ]
    );
    console.log(
      '[DB][service.transaction.insert]',
      JSON.stringify([
        nowDate,
        SalespersonName,
        ProductID,
        ProductKind,
        ProductsName,
        ProductsPrice,
        NumberOfProducts,
        TotalGrossIncome,
        CustomerID,
        Status,
      ]),
      res
    );

    const TransactionID = res.insertId;

    if (!res) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to create transaction',
      };
    }

    // Process 2 Update Inventory
    const invupdate = await this.service.inventory.update({
      StoreID,
      ProductID,
      NumberOfProduct: NumberOfProduct - NumberOfProducts,
    });

    if (!invupdate || !invupdate.success) {
      // roll back
      await this.delete({ OrderNumber: TransactionID });
      return {
        success: false,
        errno: 1002,
        msg:
          'We have placed the order for you, but there is some problems on inventory operations',
      };
    }

    // Process 3 Update Product Stock
    const productUpdate = await this.service.product.update({
      ProductID,
      InventoryAmount: InventoryAmount - NumberOfProducts,
    });

    if (!productUpdate || !productUpdate.success) {
      // roll back
      await this.delete({ OrderNumber: TransactionID });
      await this.service.inventory.update({
        StoreID,
        ProductID,
        NumberOfProduct,
      });
      return {
        success: false,
        errno: 1002,
        msg:
          'We have placed the order for you, but there is some problems on inventory operations',
      };
    }

    // Process 4 Update Transaction Status
    const transactionUpdate = await this.update({
      OrderNumber: TransactionID,
      Status: 'Finished',
    });

    if (!transactionUpdate || !transactionUpdate.success) {
      // try to finish
      await this.update({
        OrderNumber: TransactionID,
        Status: 'Finished',
      });
      return {
        success: false,
        errno: 1002,
        msg: 'We have placed the order for you. It still needs time to process.',
      };
    }
    return { success: true, data: { OrderNumber: TransactionID } };
  }

  async find(data) {
    const { OrderNumber } = data;
    let transaction;
    if (OrderNumber) {
      transaction = await this.app.mysql.query(
        'select * from transactions where OrderNumber = ?',
        [ OrderNumber ]
      );
    } else {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info1',
      };
    }
    console.log(
      `[service.transaction.find] DB: ${OrderNumber} result: ${JSON.stringify(
        transaction
      )}`
    );
    if (!transaction) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    return {
      data: transaction[0],
      success: true,
    };
  }

  async update(data) {
    // update admin info
    const transaction = await this.find({ OrderNumber: data.OrderNumber });
    if (!transaction) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    const { Status } = data;
    const res = await this.app.mysql.update(
      'transactions',
      {
        Status: data.Status || Status,
      },
      {
        where: {
          OrderNumber: data.OrderNumber,
        },
      }
    );
    if (!res) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    console.log(
      `[service.transaction.update] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: { ...transaction, ...data } };
  }
  async delete(data) {
    const { OrderNumber } = data;
    const res = await this.app.mysql.query('delete from transactions where OrderNumber = ?', [ OrderNumber ]);
    if (!res) {
      return {
        success: false,
        msg: 'fail to delete record',
      };
    }
    return { success: true };
  }
}

module.exports = RecordService;
