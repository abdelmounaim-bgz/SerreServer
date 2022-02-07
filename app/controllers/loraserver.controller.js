const Sensor = require("../models/sensor.model.js");
const Measure = require("../models/measure.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log("params: " + JSON.stringify(req.body))
    if (req.body.object == undefined) {
        res.status(400).send({
            message: "Missing the object field, yout data is not well formatted"
        });
    }

    Sensor.findByNode(req.body.deviceName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sensor with name  ${req.body.object.deviceName},Node is not paired.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sensor with id " + req.body.object.deviceName
                });
            }
        } else {
            // Create a measure
            const measure = new Measure({
                node: req.body.deviceName,
                temp1: req.body.object.temp1,
                temp2: req.body.object.temp2,
                humidity1: req.body.object.humidity1,
                humidity2: req.body.object.humidity2,
                date: new Date().toISOString()
            });
            // updating the sensors infos
            const sensor = new Sensor({
                node: data.node,
                temp1: req.body.object.temp1 == null ? data.temp1 : req.body.object.temp1,
                temp2: req.body.object.temp2 == null ? data.temp2 : req.body.object.temp2,
                humidity1: req.body.object.humidity1 == null ? data.humidity1 : req.body.object.humidity1,
                humidity2: req.body.object.humidity2 == null ? data.humidity2 : req.body.object.humidity2,
                updatedAt: new Date().toISOString()
            })
            Sensor.updateById(
                data.id,
                new Sensor(sensor),
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
                    } else {
                        // Save Measure in the database
                        Measure.create(measure, (err, data1) => {
                            if (err)
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the Measure."
                                });
                            else res.send(data);
                        });
                    }
                }
            );


        }

    });
};