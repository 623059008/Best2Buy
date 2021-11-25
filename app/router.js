'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // customer
    router.post('/admin', controller.admin.findAdmin);
    router.post('/signin', controller.admin.signin);
    router.post('/signup', controller.admin.signup);
    router.post('/cancel', controller.admin.deleteUsr);

    // transaction
    router.post('/insertTransaction', controller.transaction.insertTransaction);
    router.post('/queryTransaction', controller.transaction.queryTransaction);
    router.post('/updateTransaction', controller.transaction.updateTransaction);


    // product
    router.post('/queryProduct', controller.product.queryProduct);
    router.post('/updateProduct', controller.product.updateProduct);
    router.post('/insertProduct', controller.product.insertProduct);
    router.post('/deleteProduct', controller.product.deleteProduct);
};