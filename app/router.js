'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // customer
    router.post('/findUsr', controller.admin.findUsr);
    router.post('/signin', controller.admin.signin);
    router.post('/signup', controller.admin.signup);
    router.post('/cancel', controller.admin.deleteUsr);
    router.post('/updateUsr', controller.admin.updateUsr);

    // transaction
    router.post('/insertTransaction', controller.transaction.insertTransaction);
    router.post('/queryTransaction', controller.transaction.queryTransaction);
    router.post('/updateTransaction', controller.transaction.updateTransaction);


    // product
    router.post('/queryDetail', controller.product.queryDetail);
    router.post('/queryProduct', controller.product.queryProduct);
    router.post('/updateProduct', controller.product.updateProduct);
    router.post('/insertProduct', controller.product.insertProduct);
    router.post('/deleteProduct', controller.product.deleteProduct);
    router.post('/querySalesInfo', controller.product.querySalesInfo);
    router.post('/rankByV', controller.product.rankByV);
    router.post('/rankByP', controller.product.rankByP);
    router.post('/rankByVOB', controller.product.rankByVOB);
    router.post('/queryBCByP', controller.product.queryBCByP);


    //region
    router.post('/queryRegion', controller.region.queryRegion);
    router.post('/insertRegion', controller.region.insertRegion);
    router.post('/deleteRegion', controller.region.deleteRegion);
    router.post('/updateRegion', controller.region.updateRegion);
    router.post('/rankByPOR', controller.region.rankByPOR);
    router.post('/rankByVOR', controller.region.rankByVOR);


    //store
    router.post('/queryStore', controller.store.queryStore);
    router.post('/insertStore', controller.store.insertStore);
    router.post('/deleteStore', controller.store.deleteStore);
    router.post('/updateStore', controller.store.updateStore);

    //salesperson
    router.post('/querySalesPerson', controller.salesperson.querySalesPerson);
    router.post('/insertSalesPerson', controller.salesperson.insertSalesPerson);
    router.post('/deleteSalesPerson', controller.salesperson.deleteSalesPerson);
    router.post('/updateSalesPerson', controller.salesperson.updateSalesPerson);

    //inventory
    router.post('/queryInventory', controller.inventory.queryInventory);
    router.post('/insertInventory', controller.inventory.insertInventory);
    router.post('/deleteInventory', controller.inventory.deleteInventory);
    router.post('/updateInventory', controller.inventory.updateInventory);
};