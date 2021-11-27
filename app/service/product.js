// app/service/productistrator.js

'use strict';

const Service = require('egg').Service;

class ProductService extends Service {
    async find(data) {
        const { ProductID } = data;
        // select user info from product by username and password
        let product;
        if (ProductID) {
            product = await this.app.mysql.query('select * from products where ProductID = ?', [ProductID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info1'
            };
        }
        console.log(`[service.product.find] DB: ${ProductID} result: ${JSON.stringify(product)}`);
        if (!product) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info2'
            };
        }
        return {
            data: product[0],
            success: true,
        };
    }
    async query(data) {
        const { filter = {} } = data || {};
        // select user info from product by username and password
        let sql = 'select * from products,inventory,store,region,salesperson where';
        if (filter.ProductID) {
            sql += ' products.ProductID = \'' + filter.ProductID + '\' and products.ProductID = inventory.ProductID and inventory.StoreID = store.StoreID and store.Region = region.RegionID and store.StoreID = salesperson.StoreAssigned and'
        }
        if (filter.ProductKind) {
            sql += ' ProductKind=\'' + filter.ProductKind + '\' and';
        }
        if (filter.Name) {
            sql += ' Name like \'%' + filter.Name + '%\' and';
        }
        if (filter.MinPrice) {
            sql += ' Price >= ' + filter.MinPrice + ' and';
        }
        if (filter.MaxPrice) {
            sql += ' Price <= ' + filter.MaxPrice + ' and';
        }
        if (filter.SoldOut) {
            sql += ' InventoryAmount > 0' + ' and';
        }
        let filterNum = 0;
        for (let i in filter) {
            filterNum++;
        }
        if (filterNum === 0) {
            sql = 'select * from products';
        } else {
            sql = sql.substr(0, sql.length - 4);
        }
        console.log(`[service.product.query] DB: ${JSON.stringify(filter)} ${sql}`);
        const product = await this.app.mysql.query(sql);

        //console.log(`[service.product.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(product)}`);
        if (!product) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: product,
            success: true,
        };
    }

    async insert(data) {
        const { Name, InventoryAmount, Price, ProductKind } = data;
        const res = await this.app.mysql.query('insert into products (Name, InventoryAmount, Price, ProductKind) value (?,?,?,?)', [Name, InventoryAmount, Price, ProductKind]);
        console.log('[DB][service.product.insert]', res);
        if (!res) {
            return {
                success: false,
                errno: 1002,
                msg: 'fail to insert'
            };
        }
        return { success: true, ...res };
    }

    async delete(data) {
        const { ProductID } = data;
        const res = await this.app.mysql.query('delete from products where ProductID = ?', [ProductID]);
        if (!res) {
            return {
                success: false,
                errno: 1020,
                msg: 'fail to delete'
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
                msg: 'fail to update'
            };
        }
        const { Name, InventoryAmount, Price, ProductKind } = product.data;
        const res = await this.app.mysql.update('products', {
            Name: (data.Name || Name),
            InventoryAmount: data.InventoryAmount || InventoryAmount,
            Price: data.Price || Price,
            ProductKind: data.ProductKind || ProductKind,
        }, {
            where: {
                ProductID: data.ProductID
            }
        })
        if (!res) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        console.log(`[service.product.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: {...product, ...data } };
    }

    //query sales volumn and profit for a given porduct
    async querySAndP(data) {
        const { ProductID } = data;
        const res = await this.app.mysql.query('select sum(NumberOfProducts),sum(TotalGrossIncome) from transactions where Status = \'Yes\' and ProductID = ?', [ProductID]);
        if (!res) {
            return {
                success: false,
                errno: 1011,
                msg: 'fail to find this product'
            };
        }
        console.log(`[service.product.querySAndP] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: res }
    }

    //rank product category by sales volumn
    async rankByV(data) {
        const res = await this.app.mysql.query('select ProductKind,sum(NumberOfProducts) as S from transactions where Status = \'Yes\' group by ProductKind order by S desc');
        if (!res) {
            return {
                success: false,
                errno: 1011,
                msg: 'fail to find this product'
            };
        }
        console.log(`[service.product.rankByV] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: res }
    }

    //rank product category by profit
    async rankByP(data) {
        const res = await this.app.mysql.query('select ProductKind,sum(TotalGrossIncome) as P from transactions where Status = \'Yes\' group by ProductKind order by P desc');
        if (!res) {
            return {
                success: false,
                errno: 1011,
                msg: 'fail to find this product'
            };
        }
        console.log(`[service.product.rankByP] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: res }
    }

    // rank product by sales volumm associated with business customers
    async rankByVOB(data) {
        const res = await this.app.mysql.query('select ProductsName from transactions,businesscustomer where Status = \'Yes\' and transactions.CustomerID = businesscustomer.CustomerID order by NumberOfProducts desc');
        if (!res) {
            return {
                success: false,
                errno: 1011,
                msg: 'fail to find this product'
            };
        }
        console.log(`[service.product.rankByV] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: res }
    }

    // query business customer who buy given product most
    async queryBCByP(data) {
        const { ProductID } = data;
        const res = await this.app.mysql.query('select Name from transactions,businesscustomer where Status = \'Yes\' and ProductID = ? and transactions.CustomerID = businesscustomer.CustomerID and NumberOfProducts = (select max(NumberOfProducts) from transactions where ProductID = ? and Status = \'Yes\')', [ProductID, ProductID]);
        if (!res) {
            return {
                success: false,
                errno: 1011,
                msg: 'fail to find this product'
            };
        }
        console.log(`[service.product.querySAndP] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: res }
    }

}

module.exports = ProductService;