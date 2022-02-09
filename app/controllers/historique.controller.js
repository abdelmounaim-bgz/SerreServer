const Historique = require("../models/historique.model.js");

// Create and Save a new Historique
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Historique
    const historique = new Historique({
        id: req.body.node,
        valeur: req.body.valeur,
        date: req.body.date,
    });

    // Save Historique in the database
    Historique.create(historique, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Historique."
            });
        else res.send(data);
    });
};

// Retrieve all Historiques from the database.
exports.findAll = (req, res) => {
    Historique.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// // Find a single Historique with a HistoriqueId
// exports.findOne = (req, res) => {
//     Historique.findByNode(req.params.node, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Historique with id ${req.params.HistoriqueId}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Error retrieving Historique with id " + req.params.HistoriqueId
//                 });
//             }
//         } else res.send(data);
//     });
// };

// Update a Historique identified by the HistoriqueId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Historique.updateById(
        req.params.snesorId,
        new Historique(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.HistoriqueId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.HistoriqueId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Historique with the specified HistoriqueId in the request
exports.delete = (req, res) => {
    Historique.remove(req.params.HistoriqueId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Historique with id ${req.params.HistoriqueId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Historique with id " + req.params.HistoriqueId
                });
            }
        } else res.send({ message: `Historique was deleted successfully!` });
    });
};

// Delete all Historiques from the database.
exports.deleteAll = (req, res) => {
    Historique.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Historiques."
            });
        else res.send({ message: `All Historiques were deleted successfully!` });
    });
};

