module.exports = app => {
    const lora = require("../controllers/loraserverSerre.controller.js");

    // getting new request
    app.post("/loradata", lora.create);
};
