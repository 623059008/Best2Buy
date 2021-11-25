// app/service/quiz.js

'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
    async query(data) {
        const { filter = {} } = data || {};
        // select user info from transaction by username and password
        let sql = 'select * from transactions where';
        if (filter.ProductKind) {
            sql += ' ProductKind=\'' + filter.ProductKind + '\' and';
        }
        if (filter.Keyword) {
            sql += ' ProductsName like \'%' + filter.Keyword + '%\' and';
        }
        if (filter.OrderNumber) {
            sql += ' OrderNumber = ' + filter.OrderNumber + ' and';
        }
        if (filter.OrderNumber) {
            sql += ' OrderNumber = ' + filter.OrderNumber + ' and';
        }
        if (filter.CustomerID) {
            sql += ' CustomerID =' + filter.CustomerID + ' and';
        }
        let filterNum = 0;
        for (let i in filter) {
            filterNum++;
        }
        if (filterNum === 0) {
            sql = 'select * from transactions';
        } else {
            sql = sql.substr(0, sql.length - 4);
        }
        console.log(`[service.transaction.query] DB: ${JSON.stringify(filter)} ${sql}`);
        const transaction = await this.app.mysql.query(sql);

        //console.log(`[service.transaction.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(transaction)}`);
        if (!transaction) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: transaction,
            success: true,
        };
    }

    async insert(data) {
        const { Date, SalespersonName, ProductID, ProductKind, ProductsName, ProductsPrice, NumberOfProducts, TotalGrossIncome, CustomerID, Status } = data;
        const res = await this.app.mysql.query('insert into transactions ( Date, SalespersonName, ProductID, ProductKind, ProductsName, ProductsPrice, NumberOfProducts, TotalGrossIncome, CustomerID, Status) value (?,?,?,?,?,?,?,?,?,?)', [Date, SalespersonName, ProductID, ProductKind, ProductsName, ProductsPrice, NumberOfProducts, TotalGrossIncome, CustomerID, Status]);
        console.log('[DB][service.transaction.insert]', res);
        if (!res) {
            return {
                success: false,
                errno: 1002,
                msg: 'fail to insert'
            };
        }
        return { success: true, ...res };
    }

    async find(data) {
        const { OrderNumber } = data;
        let transaction;
        if (OrderNumber) {
            transaction = await this.app.mysql.query('select * from transactions where OrderNumber = ?', [OrderNumber]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info1'
            };
        }
        console.log(`[service.transaction.find] DB: ${OrderNumber} result: ${JSON.stringify(transaction)}`);
        if (!transaction) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info2'
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
                msg: 'fail to update'
            };
        }
        const { Status } = data;
        const res = await this.app.mysql.update('transactions', {
            Status: data.Status || Status
        }, {
            where: {
                OrderNumber: data.OrderNumber
            }
        })
        if (!res) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        console.log(`[service.transaction.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: {...transaction, ...data } };
    }
}

module.exports = RecordService;