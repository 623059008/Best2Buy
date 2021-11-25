// app/service/administrator.js

'use strict';

const Service = require('egg').Service;

const crypto = require('crypto');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

class AdminService extends Service {
    async find(data) {
        const { CustomerID } = data;
        // select user info from admin by username and password
        let usr;
        if (CustomerID) {
            usr = await this.app.mysql.query('select * from customers where CustomerID = ?', [CustomerID]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }

        //console.log(`[service.admin.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(admin)}`);
        if (!usr || usr.length == 0) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            ...usr[0],
            success: true,
        };
    }

    async signin(data) {
        const { Password, Name } = data;
        // select user info from admin by username and password
        let usr;
        if (Password && Name) {
            usr = await this.app.mysql.query('select * from customers where Password = ? && Name = ?', [Password, Name]);
        } else {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }

        console.log(`[service.admin.signin] DB: ${Name} result: ${JSON.stringify(usr)}`);
        if (usr.length < 1) {
            return {
                success: false,
                errno: 1001,
                msg: 'fail to get result for this info'
            };
        }
        return {
            data: {...usr[0] },
            success: true,
        };
    }

    /**
     * insert a new record to admin
     * @param {object} data admin info {username, password, realname, email}
     */
    async insert(data) {
        // create a new admin
        const { Kind } = data;

        if (Kind == 'Home') {
            const { Name, Street, City, State, ZipCode, Kind, Password, MarriageStatus, Gender, Age, Income } = data;
            const res_c = await this.app.mysql.query('insert into customers (Name, Street, City, State, ZipCode, Kind, Password) value(?,?,?,?,?,?,?)', [Name, Street, City, State, ZipCode, Kind, md5(Password)]);
            console.log('[DB][service.admin.insert]', res_c);
            const res_h = await this.app.mysql.query('insert into homecustomer (CustomerID, Name, MarriageStatus, Gender, Age, Income) value(?,?,?,?,?,?)', [CustomerID, Name, MarriageStatus, Gender, Age, Income]);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ CustomerID, Name, MarriageStatus, Gender, Age, Income })}, result: ${JSON.stringify(res_h)}`);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ CustomerID, Name, Street, City, State, ZipCode, Kind, Password })}, result: ${JSON.stringify(res_c)}`);
        } else if (Kind == 'Business') {
            const { CustomerID, Name, Street, City, State, ZipCode, Kind, Password, BusinessCategory, GrossAnnualIncome } = data;
            const res_b = await this.app.mysql.query('insert into businesscustomer (CustomerID, Name, BusinessCategory, GrossAnnualIncome) value(?,?,?,?)', [CustomerID, Name, BusinessCategory, GrossAnnualIncome]);
            const res_c = await this.app.mysql.query('insert into customers (CustomerID, Name, Street, City, State, ZipCode, Kind, Password) value(?,?,?,?,?,?,?,?)', [CustomerID, Name, Street, City, State, ZipCode, Kind, Password]);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ CustomerID, Name, BusinessCategory, GrossAnnualIncome })}, result: ${JSON.stringify(res_b)}`);
            console.log(`[service.admin.insert] DB: ${JSON.stringify({ CustomerID, Name, Street, City, State, ZipCode, Kind, Password })}, result: ${JSON.stringify(res_c)}`);
        } else {
            return {
                success: false,
                errno: 1010,
                msg: 'kind type invalid'
            };
        }

        if (!res || !res_c || !res_b) {
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
        const { CustomerID: cid, Kind } = data;
        const admin = await this.find(cid);
        if (!admin || !admin.success) {
            return {
                success: false,
                errno: 1003,
                msg: 'fail to update'
            };
        }
        if (Kind == 'Home') {
            const { Name, Street, City, State, ZipCode, Kind, Password, MarriageStatus, Gender, Age, Income } = usr;
            const res_c = await this.app.mysql.update('customers', {
                Name: data.Name || Name,
                Street: data.Street || Street,
                City: data.City || City,
                State: data.State || State,
                ZipCode: data.ZipCode || ZipCode,
                Kind: data.Kind || Kind,
                Password: data.Password || Password,
            }, {
                where: {
                    CustomerID: data.CustomerID
                }
            })
            const res_h = await this.app.mysql.update('homecustomer', {
                Name: data.Name || Name,
                MarriageStatus: data.MarriageStatus || MarriageStatus,
                Gender: data.Gender || Gender,
                Age: data.Age || Age,
                Income: data.Income || Income
            }, {
                where: {
                    CustomerID: data.CustomerID
                }
            })
            if (!res_c || !res_h) {
                return {
                    success: false,
                    errno: 1003,
                    msg: 'fail to update'
                };
            }
        } else {
            const { Name, Street, City, State, ZipCode, Kind, Password, BusinessCategory, GrossAnnualIncome } = usr;
            const res_b = await this.app.mysql.update('businesscustomer', {
                Name: data.Name || Name,
                BusinessCategory: data.BusinessCategory || BusinessCategory,
                GrossAnnualIncome: data.GrossAnnualIncome || GrossAnnualIncome
            }, {
                where: {
                    CustomerID: data.CustomerID
                }
            })
            const res_c = await this.app.mysql.update('customers', {
                Name: data.Name || Name,
                Street: data.Street || Street,
                City: data.City || City,
                State: data.State || State,
                ZipCode: data.ZipCode || ZipCode,
                Kind: data.Kind || Kind,
                Password: data.Password || Password,
            }, {
                where: {
                    CustomerID: data.CustomerID
                }
            })
            if (!res_b || !res_c) {
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

module.exports = AdminService;