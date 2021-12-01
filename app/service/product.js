// app/service/productistrator.js

'use strict';

const Service = require('egg').Service;

class ProductService extends Service {
  async find(data) {
    const { ProductID } = data;
    // select user info from product by username and password
    let product;
    if (ProductID) {
      product = await this.app.mysql.query(
        'select * from products where ProductID = ?', [ ProductID ]
      );
    } else {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info1',
      };
    }
    console.log(
      `[service.product.find] DB: ${ProductID} result: ${JSON.stringify(
        product
      )}`
    );
    if (!product) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info2',
      };
    }
    return {
      data: product[0],
      success: true,
    };
  }
  async queryDetail(data) {
    const { filter } = data || {};
    const { ProductID } = filter;
    // console.log(
    //   `[service.product.queryDetail] sql: select * from products P inner join inventory I on P.ProductID = I.ProductID inner join store S on S.StoreId = I.StoreID inner join Region R on R.RegionID = S.Region inner join salesperson Sales on Sales.StoreAssigned = P.ProductID where P.ProductID = ${ProductID}`
    // );
    const res = await this.app.mysql.query(
      'select * from products where ProductID = ?', [ ProductID ]
    );
    if (!res || res.length !== 1) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to select',
      };
    }
    const product = res[0];

    const inventory = await this.app.mysql.query(
      'select * from inventory I where I.ProductID = ?', [ ProductID ]
    );
    console.log(
      `[service.product.queryDetail] ${JSON.stringify(inventory)}`
    );
    product.Inventory = inventory;
    const storeList = [];
    inventory.forEach(item => {
      storeList.push(
        this.app.mysql.query(
          'select * from store where store.StoreID = ?', [ item.StoreID ]
        )
      );
    });

    const stores = await Promise.all(storeList);
    const Stores = [];
    stores.forEach(item => {
      Stores.push(item[0]);
    });

    product.Stores = Stores;

    console.log(
      `[service.product.queryDetail.stores] ${JSON.stringify(Stores)}`
    );

    const salespersonList = [];
    const regionList = [];
    Stores.forEach(item => {
      salespersonList.push(
        this.app.mysql.query(
          'select * from salesperson where StoreAssigned = ?', [ item.StoreID ]
        )
      );
      regionList.push(
        this.app.mysql.query(
          'select * from region where RegionID = ?', [ item.Region ]
        )
      );
    });

    const salesperson = await Promise.all(salespersonList);

    const region = await Promise.all(regionList);

    const SalesPerson = [];
    const Region = [];
    salesperson.forEach(item => {
      SalesPerson.push(item[0]);
    });

    region.forEach(item => {
      Region.push(item[0]);
    });

    console.log(
      `[service.product.queryDetail][salesperson] ${JSON.stringify(salesperson)}, \n [region] ${JSON.stringify(region)}`
    );

    product.SalesPerson = SalesPerson;
    product.Region = Region;

    return { success: true, data: product };
  }
  async query(data) {
    const { filter = {} } = data || {};
    // select user info from product by username and password
    let sql = 'select * from products where';
    if (filter.ProductKind) {
      sql += " ProductKind like '%" + filter.ProductKind + "%' and";
    }
    if (filter.Keyword) {
      sql += " Name like '%" + filter.Keyword + "%' and";
    }
    if (filter.MinPrice) {
      sql += ' Price >= ' + filter.MinPrice + ' and';
    }
    if (filter.MaxPrice) {
      sql += ' Price <= ' + filter.MaxPrice + ' and';
    }
    if (filter.SoldOut) {
      sql += ' InventoryAmount > 0 and';
    }
    if (filter.ProductID) {
      sql += ' ProductID = ' + filter.ProductID + ' and';
    }
    let filterNum = 0;
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        filterNum++;
      }
    });

    if (filterNum === 0) {
      sql = 'select * from products';
    } else {
      sql = sql.substr(0, sql.length - 4);
    }
    const product = await this.app.mysql.query(sql);

    console.log(`[service.product.query] DB: ${JSON.stringify(filter)} ${sql}`);

    if (!product) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    return {
      data: product,
      success: true,
    };
  }

  async insert(data) {
    const { Name, InventoryAmount, Price, ProductKind, ImgUrl } = data;
    const res = await this.app.mysql.query(
      'insert into products (Name, InventoryAmount, Price, ProductKind, ImgUrl) value (?,?,?,?,?)', [ Name, InventoryAmount, Price, ProductKind, ImgUrl ]
    );
    console.log('[DB][service.product.insert]', res);
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
    const { ProductID } = data;
    const res = await this.app.mysql.query(
      'delete from products where ProductID = ?', [ ProductID ]
    );
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
    // update admin info
    const product = await this.find({ ProductID: data.ProductID });
    if (!product) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    const { Name, InventoryAmount, Price, ProductKind, ImgUrl } = product.data;
    const res = await this.app.mysql.update(
      'products', {
        Name: data.Name || Name,
        InventoryAmount: data.InventoryAmount || InventoryAmount,
        Price: data.Price || Price,
        ProductKind: data.ProductKind || ProductKind,
        ImgUrl: data.ImgUrl || ImgUrl,
      }, {
        where: {
          ProductID: data.ProductID,
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
      `[service.product.update] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: { ...product, ...data } };
  }

  // query sales volumn and profit for a given porduct
  async querySAndP(data) {
    const { ProductID } = data;
    const res = await this.app.mysql.query(
      "select sum(NumberOfProducts),sum(TotalGrossIncome) from transactions where Status = 'Finished' and ProductID = ?", [ ProductID ]
    );
    if (!res) {
      return {
        success: false,
        errno: 1011,
        msg: 'fail to find this product',
      };
    }
    console.log(
      `[service.product.querySAndP] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: res };
  }

  // rank product category by sales volumn
  async rankByV(data) {
    const res = await this.app.mysql.query(
      "select ProductKind,sum(NumberOfProducts) as S from transactions where Status = 'Finished' group by ProductKind order by S desc"
    );
    if (!res) {
      return {
        success: false,
        errno: 1011,
        msg: 'fail to find this product',
      };
    }
    console.log(
      `[service.product.rankByV] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: res };
  }

  // rank product category by profit
  async rankByP(data) {
    const res = await this.app.mysql.query(
      "select ProductKind,sum(TotalGrossIncome) as P from transactions where Status = 'Finished' group by ProductKind order by P desc"
    );
    if (!res) {
      return {
        success: false,
        errno: 1011,
        msg: 'fail to find this product',
      };
    }
    console.log(
      `[service.product.rankByP] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: res };
  }

  // rank product by sales volumm associated with business customers
  async rankByVOB(data) {
    const res = await this.app.mysql.query(
      "select ProductsName from transactions,businesscustomer where Status = 'Finished' and transactions.CustomerID = businesscustomer.CustomerID order by NumberOfProducts desc"
    );
    if (!res) {
      return {
        success: false,
        errno: 1011,
        msg: 'fail to find this product',
      };
    }
    console.log(
      `[service.product.rankByV] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: res };
  }

  // query business customer who buy given product most
  async queryBCByP(data) {
    const { ProductID } = data;
    const res = await this.app.mysql.query(
      "select Name from transactions,businesscustomer where Status = 'Finished' and ProductID = ? and transactions.CustomerID = businesscustomer.CustomerID and NumberOfProducts = (select max(NumberOfProducts) from transactions where ProductID = ? and Status = 'Yes')", [ ProductID, ProductID ]
    );
    if (!res) {
      return {
        success: false,
        errno: 1011,
        msg: 'fail to find this product',
      };
    }
    console.log(
      `[service.product.querySAndP] DB: ${JSON.stringify(
        data
      )} res:${JSON.stringify(res)}`
    );
    return { success: true, data: res };
  }
}

module.exports = ProductService;
