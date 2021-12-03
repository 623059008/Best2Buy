'use strict';

module.exports = () => {
  return async function sessionToken(ctx, next) {
    try {
      const { userid, token } = ctx.request.body;
      const frontApiList = [ '/queryAllProducts', '/queryAllStores', '/queryAllUsers', '/queryAllRegions', '/checkAuth' ];
      const clientApiList = [ '/admin', '/queryProducts', '/queryProductsById', '/queryStores', '/queryStoresById', '/queryRegions', '/insertProducts', '/queryProducts' ];
      const interfaceList = frontApiList.concat(clientApiList);
      const { url } = ctx.request;
      console.log('[auth]', url, interfaceList.includes(url));
      // need to check token
      if (interfaceList.includes(url)) {
        const redis = ctx.app.redis;
        // usu redis to implement session
        const redis_token = await redis.get(`token${userid}`);
        if (!(redis_token === token)) {
          console.log(`[auth] validate fail ${redis_token} ${JSON.stringify({ userid, token })}`);
          return (ctx.body = {
            errmsg: 'fail to validate token',
            errno: 2000,
            success: false,
          });
        }
      }
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
    }
  };
};
