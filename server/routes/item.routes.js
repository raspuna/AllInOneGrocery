const ItemController = require("../controllers/item.controller");

module.exports = (app) => {
  app.post("/api/item", ItemController.createItem);
  app.get("/api/items", ItemController.getAllItems);
  app.get("/api/items/:storeId", ItemController.getStoreItems);
  app.get("/api/items/category/:className", ItemController.getItemsByCategory);
  app.get(
    "/api/store/:storeId/items/search/:searchText",
    ItemController.getItemsBySearch
  );
  app.get("/api/item/:id", ItemController.getOneItem);
  app.put("/api/items/:id", ItemController.updateItem);
  app.delete("/api/item/:id", ItemController.deleteItem);
};
