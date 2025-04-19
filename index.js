const express = require("express");
const rutaApi = require("./routes");
const app = express();
const port = 3000;

app.use(express.json({}));
app.use("/api", rutaApi);
app.listen(port, () => {
  console.log("Server runnig on port: ", port);
});
