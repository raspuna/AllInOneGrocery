const StoreController = require("../controllers/store.controller");

module.exports = (app) => {
  app.post("/api/store", StoreController.createStore);
  //app.get("/api/stores", StoreController.getAllStores);
  //app.get("/api/store/:id", StoreController.getOneStore);
  //app.put("/api/stores/:id", StoreController.updateStore);
  //app.delete("/api/store/:id", StoreController.deleteStore);
};
