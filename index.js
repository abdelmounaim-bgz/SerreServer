const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/sensor.routes.js")(app);
require("./app/routes/measure.routes.js")(app);
require("./app/routes/loradata.routes.js")(app);
require("./app/routes/SerreSensor.routes.js")(app);
require("./app/routes/historique.routes.js")(app);
// simple route
app.get("/", (req, res) => {
    res.json({ message: "no get in here" });
});

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
