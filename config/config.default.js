/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mysql: {
      client: {
        // host
        host: '127.0.0.1',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '',
        // database
        database: 'best2buy',
      },
      app: true,
      agent: false,
    },
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635015431805_5341';

  config.security = {
    csrf: {
      enable: false,
      // match: /^\/api/, // support regexp
      // match: ctx => ctx.path.startsWith('/api'), // support function
      // match: [ ctx => ctx.path.startsWith('/api'), /^\/foo$/, '/bar'], // support Array
    },
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/Best2BuyFrontend'),
  }

  config.cors = {
    origin: '*',
  };

  config.bodyParser = {
    enable: true,
    formLimit: '300mb',
    jsonLimit: '300mb',
    textLimit: '300mb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 10000,
      depth: 50,
      parameterLimit: 10000,
    },
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
