const Measure = require("../models/measure.model.js");

// Create and Save a new Measure
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Measure
    const measure = new Measure({
        node: req.body.node,
        gwc: req.body.GWC,
        LightIntensity: req.body.LightIntensity,
        AmbiantTemperature: req.body.AmbiantTemperature,
        SoilTemperature: req.body.SoilTemperature,
        AmbiantRH: req.body.AmbiantRH,
        SoilMoisture: req.body.SoilMoisture,
    });

    // Save Measure in the database
    Measure.create(measure, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Measure."
            });
        else res.send(data);
    });
};

// Retrieve all Measures from the database.
exports.findAll = (req, res) => {
    Measure.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Measure with a MeasureId
exports.findOne = (req, res) => {
    Measure.findById(req.params.MeasureId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Measure with id ${req.params.MeasureId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Measure with id " + req.params.MeasureId
                });
            }
        } else res.send(data);
    });
};

// Update a Measure identified by the MeasureId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Measure.updateById(
        req.params.snesorId,
        new Measure(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.MeasureId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.MeasureId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Measure with the specified MeasureId in the request
exports.delete = (req, res) => {
    Measure.remove(req.params.MeasureId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Measure with id ${req.params.MeasureId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Measure with id " + req.params.MeasureId
                });
            }
        } else res.send({ message: `Measure was deleted successfully!` });
    });
};

// Delete all Measures from the database.
exports.deleteAll = (req, res) => {
    Measure.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Measures."
            });
        else res.send({ message: `All Measures were deleted successfully!` });
    });
};
