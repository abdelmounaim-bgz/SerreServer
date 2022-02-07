module.exports = app => {
    const lora = require("../controllers/loraserver.controller.js");

    // getting new request
    app.post("/loradata", lora.create);
};
