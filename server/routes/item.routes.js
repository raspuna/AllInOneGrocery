const ItemController = require('../controllers/item.controller');

module.exports = (app) => {
    app.post('api/item', ItemController.createItem);
    app.get('api/items', ItemController.getAllItems);
    app.get('api/items/_id',ItemController.getOneItem);
    app.put('api/items/:id', ItemController.updateItem);
    app.delete('api/item/:id', ItemController.deleteItem);
}