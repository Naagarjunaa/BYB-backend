global.express = require("express");
global.app = express();
const upload = require("express-fileupload");

app.use(upload());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

require('./routes');

app.listen(3000, () => {
  console.log("Server is listening on port'http://localhost:3000'");
})