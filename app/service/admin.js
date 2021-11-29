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
    console.log(CustomerID);
    // select user info from admin by username and password
    let usr;
    if (CustomerID) {
      usr = await this.app.mysql.query('select * from customers where CustomerID = ?', [ CustomerID ]);
    } else {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to get result for this info',
      };
    }

    // console.log(`[service.admin.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(admin)}`);
    if (!usr || usr.length === 0) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    return {
      data: { ...usr[0] },
      success: true,
    };
  }

  async signin(data) {
    const { Password, Email } = data;
    // select user info from admin by username and password
    const usr = await this.app.mysql.query('select * from customers where Password = ? && Email = ?', [ md5(Password), Email ]);
    console.log(`[service.admin.signin] DB: ${Email} result: ${JSON.stringify(usr)}`);
    if (!usr || usr.length !== 1) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    const user = usr[0];
    user.Password = null;
    let res = [];
    if (user.Kind === 'Home') {
      res = await this.app.mysql.query('select * from homecustomer where CustomerID = ?', [ user.CustomerID ]);
    } else if (user.Kind === 'Business') {
      res = await this.app.mysql.query('select * from businesscustomer where CustomerID = ?', [ user.CustomerID ]);
    }

    if (!res || res.length !== 1) {
      return {
        data: { ...user },
        success: true,
      };
    }

    return {
      data: { ...user, ...res[0] },
      success: true,
    };
  }

  /**
   * insert a new record to admin
   * @param {object} data admin info {username, password, realname, email}
   */
  async insert(data) {
    // create a new admin
    let res_sec = {};
    const { Name, Street, City, State, ZipCode, Kind, Password, MarriageStatus, Gender, Age, Income, Tel, Email, BusinessCategory, GrossAnnualIncome } = data;
    const res = await this.app.mysql.query('insert into customers (Name, Street, City, State, ZipCode, Kind, Password, Tel, Email) value(?,?,?,?,?,?,?,?,?)', [ Name, Street, City, State, ZipCode, Kind, md5(Password), Tel, Email ]);
    console.log('[DB][service.admin.insert] ', data, res);

    if (!res) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to insert',
      };
    }

    const insertID = res.insertId;

    if (Kind === 'Home') {
      res_sec = await this.app.mysql.query('insert into homecustomer (CustomerID, Name, MarriageStatus, Gender, Age, Income) value(?,?,?,?,?,?)', [ insertID, Name, MarriageStatus, Gender, Age, Income ]);
    } else if (Kind === 'Business') {
      res_sec = await this.app.mysql.query('insert into businesscustomer (CustomerID, Name, BusinessCategory, GrossAnnualIncome) value(?,?,?,?)', [ insertID, Name, BusinessCategory, GrossAnnualIncome ]);
    }

    if (!res_sec) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to insert',
      };
    }
    return { success: true };
  }

  async delete(data) {
    const { CustomerID } = data;
    const res = await this.app.mysql.query('delete from customers where customerID = ?', [ CustomerID ]);
    if (!res) {
      return {
        success: false,
        errno: 1020,
        msg: 'fail to delete',
      };
    }
    return { success: true };
  }

  /**
   * Update administrator information by id
   * @param {object} data  admin info {id, username, password, realname, email}
   */
  async update(data) {
    // update admin info
    let usr = await this.find(data);
    if (!usr.success || !usr.data) {
      return {
        success: false,
        errno: 1003,
        msg: 'unable to find this user',
      };
    }
    usr = usr.data;

    const { Name, Street, City, State, ZipCode, Kind, Password, MarriageStatus, Gender, Age, Income, BusinessCategory, GrossAnnualIncome } = usr;
    const res_c = await this.app.mysql.update('customers', {
      Name: data.Name || Name,
      Street: data.Street || Street,
      City: data.City || City,
      State: data.State || State,
      ZipCode: data.ZipCode || ZipCode,
      Kind: data.Kind || Kind,
      Password: md5(data.Password) || Password,
    }, {
      where: {
        CustomerID: data.CustomerID,
      },
    });

    if (!res_c) {
      return {
        success: false,
        errno: 1003,
        msg: 'unable to find this user',
      };
    }

    if (Kind === 'Home') {
      const res_h = await this.app.mysql.update('homecustomer', {
        Name: data.Name || Name,
        MarriageStatus: data.MarriageStatus || MarriageStatus,
        Gender: data.Gender || Gender,
        Age: data.Age || Age,
        Income: data.Income || Income,
      }, {
        where: {
          CustomerID: data.CustomerID,
        },
      });
      if (!res_h) {
        return {
          success: false,
          errno: 1003,
          msg: 'fail to update',
        };
      }
    } else if (Kind === 'Business') {
      const res_b = await this.app.mysql.update('businesscustomer', {
        Name: data.Name || Name,
        BusinessCategory: data.BusinessCategory || BusinessCategory,
        GrossAnnualIncome: data.GrossAnnualIncome || GrossAnnualIncome,
      }, {
        where: {
          CustomerID: data.CustomerID,
        },
      });
      if (!res_b) {
        return {
          success: false,
          errno: 1003,
          msg: 'fail to update',
        };
      }
    }
    return { success: true, data: { ...usr, ...data } };
  }
}

module.exports = AdminService;
