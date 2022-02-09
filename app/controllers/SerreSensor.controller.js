const SerreSensor = require("../models/SerreSensor.model.js");

// Create and Save a new SerreSensor
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a SerreSensor
    const SerreSensor = new SerreSensor({
        id: req.body.node,
        valeur: req.body.valeur,
        date: req.body.date,
    });

    // Save SerreSensor in the database
    SerreSensor.create(SerreSensor, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SerreSensor."
            });
        else res.send(data);
    });
};

// Retrieve all SerreSensors from the database.
exports.findAll = (req, res) => {
    SerreSensor.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// // Find a single SerreSensor with a SerreSensorId
// exports.findOne = (req, res) => {
//     SerreSensor.findByNode(req.params.node, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found SerreSensor with id ${req.params.SerreSensorId}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving SerreSensor with id " + req.params.SerreSensorId
//                 });
//             }
//         } else res.send(data);
//     });
// };

// Update a SerreSensor identified by the SerreSensorId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    SerreSensor.updateById(
        req.params.snesorId,
        new SerreSensor(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.SerreSensorId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.SerreSensorId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a SerreSensor with the specified SerreSensorId in the request
exports.delete = (req, res) => {
    SerreSensor.remove(req.params.SerreSensorId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found SerreSensor with id ${req.params.SerreSensorId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete SerreSensor with id " + req.params.SerreSensorId
                });
            }
        } else res.send({ message: `SerreSensor was deleted successfully!` });
    });
};

// Delete all SerreSensors from the database.
exports.deleteAll = (req, res) => {
    SerreSensor.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all SerreSensors."
            });
        else res.send({ message: `All SerreSensors were deleted successfully!` });
    });
};

