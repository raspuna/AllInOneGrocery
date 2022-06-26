const OrderController = require("../controllers/order.controller");

module.exports = (app) => {
  app.post("/api/order", OrderController.createNewOrder);
  app.get("/api/order", OrderController.getAllOrder);
  app.get("/api/order/_id", OrderController.getOneOrder);
  app.put("/api/order/:id", OrderController.updateOrder);
  app.delete("/api/order/:id", OrderController.deleteOrder);
};
