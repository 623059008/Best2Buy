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


    //region
    router.post('/queryRegion', controller.region.queryRegion);
    router.post('/insertRegion', controller.region.insertRegion);
    router.post('/deleteRegion', controller.region.deleteRegion);
    router.post('/updateRegion', controller.region.updateRegion);


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