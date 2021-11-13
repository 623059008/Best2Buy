// app/service/administrator.js

'use strict';

const Service = require('egg').Service;

const crypto = require('crypto');

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

class AdaminService extends Service {
  async find(data) {
    const { email, realname, birthday, uid } = data;
    // select user info from admin by username and password
    let admin;
    if (uid) {
      admin = await this.app.mysql.get('admin', { id: uid });
    } else if (email && realname && birthday) {
      admin = await this.app.mysql.get('admin', { email, realname, birthday });
    }

    console.log(`[service.admin.find] DB: ${uid} ${email}, ${realname}, ${birthday} result: ${JSON.stringify(admin)}`);
    if (!admin) {
      return {
        success: false,
        errno: 1001,
        msg: 'fail to get result for this info',
      };
    }
    admin.password = null;
    admin.email = null;
    admin.birthday = null;
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
    const { birthday, realname, email } = data;
    const res = await this.app.mysql.insert('admin', { birthday, realname, email });
    console.log(`[service.admin.insert] DB: ${JSON.stringify({ birthday, realname, email })}, result: ${JSON.stringify(res)}`);
    if (!res) {
      return {
        success: false,
        errno: 1002,
        msg: 'fail to insert',
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
    const { id } = data;
    const admin = await this.find(id);
    if (!admin || !admin.success) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    const { username, password, realname, email } = admin;
    const res = await this.app.mysql.update('admin', {
      username: data.username || username,
      password: data.password || md5(password),
      realname: data.realname || realname,
      email: data.email || email,
    });
    if (!res) {
      return {
        success: false,
        errno: 1003,
        msg: 'fail to update',
      };
    }
    return { success: true, data: { ...admin, ...data } };
  }
}

module.exports = AdaminService;
