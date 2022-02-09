module.exports = app => {
    const historiques = require("../controllers/historique.controller.js");

    // Create a new historique
    app.post("/historiques", historiques.create);

    // Retrieve all historiques
    app.get("/historiques", historiques.findAll);

    // Update a historique with historiqueId
    app.put("/historiques/:historiqueId", historiques.update);

    // Delete a historique with historiqueId
    app.delete("/historiques/:historiqueId", historiques.delete);

    // Create a new historique
    app.delete("/historiques", historiques.deleteAll);
};