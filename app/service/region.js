// app/service/regionistrator.js

'use strict';

const Service = require('egg').Service;

class RegionService extends Service {
    async find(data) {
        const { RegionID } = data;
        // select user info from region by username and password
        let region;
        if (RegionID) {
            region = await this.app.mysql.query('select * from region where RegionID = ?', [RegionID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info1'
            };
        }
        console.log(`[service.region.find] DB: ${RegionID} result: ${JSON.stringify(region)}`);
        if (!region) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info2'
            };
        }
        return {
            data: region[0],
            success: true,
        };
    }
    async query(data) {
        const { filter = {} } = data || {};
        // select user info from region by username and password
        let sql = 'select * from region where';
        if (filter.RegionID) {
            sql += ' RegionID=\'' + filter.RegionID + '\' and';
        }
        if (filter.Keyword) {
            sql += ' Name like \'%' + filter.Keyword + '%\' and';
        }
        if (filter.Manager) {
            sql += ' Manager = ' + JSON.stringify(filter.Manager) + ' and';
        }
        let filterNum = 0;
        for (let i in filter) {
            filterNum++;
        }
        if (filterNum === 0) {
            sql = 'select * from region';
        } else {
            sql = sql.substr(0, sql.length - 4);
        }
        console.log(`[service.region.query] DB: ${JSON.stringify(filter)} ${sql}`);
        const region = await this.app.mysql.query(sql);

        //console.log(`[service.region.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(region)}`);
        if (!region) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: region,
            success: true,
        };
    }

    async insert(data) {
        const { Name, Manager } = data;
        const res = await this.app.mysql.query('insert into region (Name, Manager) value (?,?)', [Name, Manager]);
        console.log('[DB][service.region.insert]', res);
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
        const { RegionID } = data;
        const res = await this.app.mysql.query('delete from region where RegionID = ?', [RegionID]);
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
        const region = await this.find({ RegionID: data.RegionID });
        if (!region) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        const { Name, Manager } = region;
        const res = await this.app.mysql.update('region', {
            Name: data.Name || Name,
            Manager: data.Manager || Manager
        }, {
            where: {
                RegionID: data.RegionID
            }
        })
        if (!res) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        console.log(`[service.region.update] DB: ${JSON.stringify(data)} res:${JSON.stringify(res)}`);
        return { success: true, data: {...region, ...data } };
    }
}

module.exports = RegionService;