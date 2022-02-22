const Historique = require("../models/historique.model.js");
const Measure = require("../models/measure.model.js");
const SerreSensor = require("../models/SerreSensor.model.js");

const refSensor = [
    {
        ref: 1,
        param: "AmbientTemperature"
    },
    {
        ref: 2,
        param: "SoilTemperature"
    },
    {
        ref: 3,
        param: "AmbientRH"
    },
    {
        ref: 4,
        param: "GWC"
    },
]

var data;

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else if (req.body.object == undefined) {
        console.log("params: " + JSON.stringify(req.body))
        res.status(400).send({
            message: "Missing the object field, yout data is not well formatted"
        });
    } else {
        refSensor.forEach(ref => {
            const historique = new Historique({
                id: ref.ref,
                valeur: req.body.object[ref.param] == "Wet" ? 1.3 : req.body.object[ref.param] == "Dry" ? 0.0 : req.body.object[ref.param],
                date: new Date()
            });
            const serreSensor = new SerreSensor({
                id: ref.ref,
                valeur: req.body.object[ref.param] == "Wet" ? 1.3 : req.body.object[ref.param] == "Dry" ? 0.0 : req.body.object[ref.param],
                date: new Date()
            })
            SerreSensor.updateById(
                ref.ref,
                new SerreSensor(serreSensor),
                (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Not found node with id ${req.params.sensorId}.`
                            });
                        } else {
                            res.status(500).send({
                                message: "Error updating node with id " + req.params.sensorId
                            });
                        }
                    } else {

                        // Save Measure in the database
                        Historique.create(historique, (err, data1) => {
                            if (err)
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the Measure."
                                });
                            else data = data;
                        });
                    }
                }
            );
        });
        res.send(data);
    }




    // // Create a measure
    // const measure = new Measure({
    //     node: req.body.deviceName,
    //     gwc: req.body.object.GWC,
    //     LightIntensity: req.body.object.LightIntensity,
    //     AmbiantTemperature: req.body.object.AmbientTemperature,
    //     SoilTemperature: req.body.object.SoilTemperature,
    //     AmbiantRH: req.body.object.AmbientRH,
    //     SoilMoisture: req.body.object.SoilMoisture,
    //     date: new Date().toISOString()
    // });
    // updating the sensors infos


};