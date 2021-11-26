// app/service/storeistrator.js

'use strict';

const Service = require('egg').Service;

class StoreService extends Service {
    async find(data) {
        const { StoreID } = data;
        // select user info from store by username and password
        let store;
        if (StoreID) {
            store = await this.app.mysql.query('select * from store where StoreID = ?', [StoreID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info1'
            };
        }
        console.log(`[service.store.find] DB: ${StoreID} result: ${JSON.stringify(store)}`);
        if (!store) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info2'
            };
        }
        return {
            data: store[0],
            success: true,
        };
    }
    async query(data) {
        const { filter = {} } = data || {};
        // select user info from store by username and password
        let sql = 'select * from store where';
        if (filter.StoreID) {
            sql += ' StoreID=\'' + filter.StoreID + '\' and';
        }
        if (filter.Address) {
            sql += ' Address like \'%' + filter.Address + '%\' and';
        }
        if (filter.Manager) {
            sql += ' Manager = ' + JSON.stringify(filter.Manager) + ' and';
        }
        if (filter.Region) {
            sql += ' Region = ' + filter.Region + ' and';
        }
        let filterNum = 0;
        for (let i in filter) {
            filterNum++;
        }
        if (filterNum === 0) {
            sql = 'select * from store';
        } else {
            sql = sql.substr(0, sql.length - 4);
        }
        console.log(`[service.store.query] DB: ${JSON.stringify(filter)} ${sql}`);
        const store = await this.app.mysql.query(sql);

        //console.log(`[service.store.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(store)}`);
        if (!store) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: store,
            success: true,
        };
    }

    async insert(data) {
        const { Address, Manager, NumberOfSalespersons, Region } = data;
        const res = await this.app.mysql.query('insert into store (Address, Manager, NumberOfSalespersons, Region ) value (?,?,?,?)', [Address, Manager, NumberOfSalespersons, Region]);
        console.log('[DB][service.store.insert]', res);
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
        const { StoreID } = data;
        const res = await this.app.mysql.query('delete from store where StoreID = ?', [StoreID]);
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
        const store = await this.find({ StoreID: data.StoreID });
        if (!store) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        const { Address, Manager, NumberOfSalespersons } = store;
        const res = await this.app.mysql.update('store', {
            Address: data.Address || Address,
            Manager: data.Manager || Manager,
            NumberOfSalespersons: data.NumberOfSalespersons || NumberOfSalespersons,
        }, {
            where: {
                StoreID: data.StoreID
            }
        })
        if (!res) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        console.log(`[service.store.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: {...store, ...data } };
    }
}

module.exports = StoreService;