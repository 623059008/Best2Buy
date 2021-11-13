// app/service/administrator.js

'use strict';

const Service = require('egg').Service;

const crypto = require('crypto');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

class AdaminService extends Service {
    async find(data) {
        const { customerID } = data;
        // select user info from admin by username and password
        let admin;
        if (customerID) {
            admin = await this.app.mysql.query('select * from admin where customerID = ?', [customerID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }

        console.log(`[service.admin.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(admin)}`);
        if (!admin || admin.length == 0) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            ...admin[0],
            success: true,
        };
    }

    async signin(data) {
        const { password, name } = data;
        // select user info from admin by username and password
        let admin;
        if (password && name) {
            admin = await this.app.mysql.query('select * from customer where password = ? && name = ?', [password, name]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }

        console.log(`[service.admin.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(admin)}`);
        if (!admin) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            ...admin,
            success: true,
        };
    }

    /**
     * insert a new record to admin
     * @param {object} data admin info {username, password, realname, email}
     */
    async insert(data) {
        // create a new admin
        const { kind } = data;

        if (kind == 'home') {
            const { customerID, name, address, marriageStatus, gender, age, income } = data;
            const res = await this.app.mysql.query('insert into admin (customerID, name, address, marriageStatus, gender, age, income) value(?,?,?,?,?,?,?)', [customerID, name, address, marriageStatus, gender, age, income]);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ customerID, name, address, marriageStatus, gender, age, income })}, result: ${JSON.stringify(res)}`);
        } else if (kind == 'business') {
            const { customerID, name, address, category, GAincome } = data;
            const res = await this.app.mysql.query('insert into admin (customerID, name, address, category, GAincome) value(?,?,?,?,?)', [customerID, name, address, category, GAincome]);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ customerID, name, address, category, GAincome })}, result: ${JSON.stringify(res)}`);
        } else {
            return {
                success: false,
                errno: 1010,
                msg: 'kind type invalid'
            };
        }

        if (!res) {
            return {
                success: false,
                errno: 1002,
                msg: 'fail to insert'
            };
        }
        return { success: true, ...res };
    }

    /**
     * Update administrator information by id
     * @param {object} data  admin info {id, username, password, realname, email}
     */
    async update(data) {
        // update admin info
        const { customerID: cid, kind } = data;
        const admin = await this.find(cid);
        if (!admin || !admin.success) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        if (kind == 'home') {
            const { name, address, marriageStatus, gender, age, income } = admin;
            const res = await this.app.mysql.update('admin', {
                name: data.name || name,
                address: data.address || address,
                marriageStatus: data.marriageStatus || marriageStatus,
                gender: data.gender || gender,
                age: data.age || age,
                income: data.income || income
            }, {
                where: {
                    customerID: data.customerID
                }
            })
            if (!res) {
                return {
                    success: false,
                    errno: 1003,
                    msg: 'fail to update'
                };
            }
        } else {
            const { name, address, category, GAincome } = admin;
            const res = await this.app.mysql.update('admin', {
                name: data.name || name,
                address: data.address || address,
                category: data.category || category,
                GAincome: data.GAincome || GAincome
            }, {
                where: {
                    customerID: data.customerID
                }
            })
            if (!res) {
                return {
                    success: false,
                    errno: 1003,
                    msg: 'fail to update'
                };
            }
        };
        return { success: true, data: {...admin, ...data } };
    }
}

module.exports = AdaminService;