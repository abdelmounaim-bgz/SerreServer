const Sensor = require("../models/sensor.model.js");

// Create and Save a new Sensor
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Sensor
    const sensor = new Sensor({
        node: req.body.node,
        temp1: req.body.temp1,
        temp2: req.body.temp2,
        humidity1: req.body.humidity1,
        humidity2: req.body.humidity2,
    });

    // Save sensor in the database
    Sensor.create(sensor, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sensor."
            });
        else res.send(data);
    });
};

// Retrieve all Sensors from the database.
exports.findAll = (req, res) => {
    Sensor.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Sensor with a SensorId
exports.findOne = (req, res) => {
    Sensor.findByNode(req.params.node, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sensor with id ${req.params.sensorId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sensor with id " + req.params.sensorId
                });
            }
        } else res.send(data);
    });
};

// Update a Sensor identified by the SensorId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Sensor.updateById(
        req.params.snesorId,
        new Sensor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.sensorId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.sensorId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Sensor with the specified SensorId in the request
exports.delete = (req, res) => {
    Sensor.remove(req.params.sensorId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sensor with id ${req.params.sensorId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sensor with id " + req.params.sensorId
                });
            }
        } else res.send({ message: `Sensor was deleted successfully!` });
    });
};

// Delete all Sensors from the database.
exports.deleteAll = (req, res) => {
    Sensor.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Sensors."
            });
        else res.send({ message: `All Sensors were deleted successfully!` });
    });
};
