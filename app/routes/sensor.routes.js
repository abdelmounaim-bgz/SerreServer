module.exports = app => {
    const sensors = require("../controllers/sensor.controller.js");

    // Create a new sensor
    app.post("/sensors", sensors.create);

    // Retrieve all sensors
    app.get("/sensors", sensors.findAll);

    // Retrieve a single sensor with sensorId
    app.get("/sensors/:sensorId", sensors.findOne);

    // Update a sensor with sensorId
    app.put("/sensors/:sensorId", sensors.update);

    // Delete a sensor with sensorId
    app.delete("/sensors/:sensorId", sensors.delete);

    // Create a new sensor
    app.delete("/sensors", sensors.deleteAll);
};
