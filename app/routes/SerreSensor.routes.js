module.exports = app => {
    const SerreSensors = require("../controllers/SerreSensor.controller.js");

    // Create a new SerreSensor
    app.post("/SerreSensors", SerreSensors.create);

    // Retrieve all SerreSensors
    app.get("/SerreSensors", SerreSensors.findAll);

    // Update a SerreSensor with SerreSensorId
    app.put("/SerreSensors/:SerreSensorId", SerreSensors.update);

    // Delete a SerreSensor with SerreSensorId
    app.delete("/SerreSensors/:SerreSensorId", SerreSensors.delete);

    // Create a new SerreSensor
    app.delete("/SerreSensors", SerreSensors.deleteAll);
};