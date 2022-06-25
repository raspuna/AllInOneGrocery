const groceryController = require('../controllers/grocery.controller');

module.exports = (app) => {
    app.post('/api/grocery', groceryController.creategrocery);
    app.get('/api/grocerys', groceryController.getAllgrocerys);
    app.get('/api/grocerys/_id',groceryController.getOnegrocery);
    app.put('/api/grocerys/:id', groceryController.updategrocery);
    app.delete('/api/grocery/:id', groceryController.deletegrocery);
}