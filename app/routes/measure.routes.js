module.exports = app => {
    const measures = require("../controllers/measure.controller.js");

    // Create a new measure
    app.post("/measures", measures.create);

    // Retrieve all measures
    app.get("/measures", measures.findAll);

    // Retrieve a single measure with measureId
    app.get("/measures/:measureId", measures.findOne);

    // Update a measure with measureId
    app.put("/measures/:measureId", measures.update);

    // Delete a measure with measureId
    app.delete("/measures/:measureId", measures.delete);

    // Create a new measure
    app.delete("/measures", measures.deleteAll);
};