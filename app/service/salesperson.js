// app/service/salespersonistrator.js

'use strict';

const Service = require('egg').Service;

class SalesPersonService extends Service {
    async find(data) {
        const { SalesPersonID } = data;
        // select user info from salesperson by username and password
        let salesperson;
        if (SalesPersonID) {
            salesperson = await this.app.mysql.query('select * from salesperson where SalesPersonID = ?', [SalesPersonID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info1'
            };
        }
        console.log(`[service.salesperson.find] DB: ${SalesPersonID} result: ${JSON.stringify(salesperson)}`);
        if (!salesperson) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info2'
            };
        }
        return {
            data: salesperson[0],
            success: true,
        };
    }
    async query(data) {
        const { filter = {} } = data || {};
        // select user info from salesperson by username and password
        let sql = 'select * from salesperson where';
        if (filter.SalesPersonID) {
            sql += ' SalesPersonID=\'' + filter.SalesPersonID + '\' and';
        }
        if (filter.Address) {
            sql += ' Address like \'%' + filter.Address + '%\' and';
        }
        if (filter.Name) {
            sql += ' Name = ' + JSON.stringify(filter.Name) + ' and';
        }
        if (filter.Email) {
            sql += ' Email = ' + JSON.stringify(filter.Email) + ' and';
        }
        if (filter.JobTitle) {
            sql += ' JobTitle = ' + JSON.stringify(filter.JobTitle) + ' and';
        }
        if (filter.Salary) {
            sql += ' Salary = ' + filter.Salary + ' and';
        }
        if (filter.StoreAssigned) {
            sql += ' StoreAssigned = ' + filter.StoreAssigned + ' and';
        }
        let filterNum = 0;
        for (let i in filter) {
            filterNum++;
        }
        if (filterNum === 0) {
            sql = 'select * from salesperson';
        } else {
            sql = sql.substr(0, sql.length - 4);
        }
        console.log(`[service.salesperson.query] DB: ${JSON.stringify(filter)} ${sql}`);
        const salesperson = await this.app.mysql.query(sql);

        //console.log(`[service.salesperson.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(salesperson)}`);
        if (!salesperson) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: salesperson,
            success: true,
        };
    }

    async insert(data) {
        const { Name, Address, Email, JobTitle, StoreAssigned, Salary } = data;
        const res = await this.app.mysql.query('insert into salesperson (Name, Address, Email, JobTitle, StoreAssigned, Salary ) value (?,?,?,?,?,?)', [Name, Address, Email, JobTitle, StoreAssigned, Salary]);
        console.log('[DB][service.salesperson.insert]', res);
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
        const { SalesPersonID } = data;
        const res = await this.app.mysql.query('delete from salesperson where SalesPersonID = ?', [SalesPersonID]);
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
        const salesperson = await this.find({ SalesPersonID: data.SalesPersonID });
        if (!salesperson) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        const { Name, Address, Email, JobTitle, StoreAssigned, Salary } = salesperson;
        const res = await this.app.mysql.update('salesperson', {
            Name: data.Name || Name,
            Address: data.Address || Address,
            Email: data.Email || Email,
            JobTitle: data.JobTitle || JobTitle,
            StoreAssigned: data.StoreAssigned || StoreAssigned,
            Salary: data.Salary || Salary
        }, {
            where: {
                SalesPersonID: data.SalesPersonID
            }
        })
        if (!res) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        console.log(`[service.salesperson.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: {...salesperson, ...data } };
    }
}

module.exports = SalesPersonService;