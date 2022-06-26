const groceryController = require("../controllers/grocery.controller");

module.exports = (app) => {
  app.post("/api/grocery", groceryController.createNewGrocery);
  app.get("/api/grocery", groceryController.getAllGrocery);
  app.get("/api/grocery/_id", groceryController.getOneGrocery);
  app.put("/api/grocery/:id", groceryController.updateGrocery);
  app.delete("/api/grocery/:id", groceryController.deleteGrocery);
};
