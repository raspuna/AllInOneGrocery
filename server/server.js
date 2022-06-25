const express = require("express");
const cors = require("cors");
require("./config/mongoose.config");
//this is for authentication
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;
app.use(cookieParser());
// this is for authentication
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require('./routes/item.routes')(app);
//require("./routes/ .routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
