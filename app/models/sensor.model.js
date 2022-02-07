const sql = require("./db.js");

// constructor
const Sensor = function (Sensor) {
    this.node = Sensor.node;
    this.gwc = Sensor.gwc;
    this.LightIntensity = Sensor.LightIntensity;
    this.AmbiantTemperature = Sensor.AmbiantTemperature;
    this.SoilTemperature = Sensor.SoilTemperature;
    this.AmbiantRH = Sensor.AmbiantRH;
    this.SoilMoisture = Sensor.SoilMoisture;
    this.updatedAt = Sensor.updatedAt;
};

Sensor.create = (newSensor, result) => {
    sql.query("INSERT INTO sensor SET ?", newSensor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Sensor: ", { id: res.insertId, ...newSensor });
        result(null, { id: res.insertId, ...newSensor });
    });
};

Sensor.findById = (SensorId, result) => {
    sql.query(`SELECT * FROM sensor WHERE id = ${SensorId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Sensor: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Sensor with the id
        result({ kind: "not_found" }, null);
    });
};
Sensor.findByNode = (node, result) => {
    sql.query(`SELECT * FROM sensor WHERE node = "${node}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Sensor: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Sensor with the id
        result({ kind: "not_found" }, null);
    });
};

Sensor.getAll = result => {
    sql.query("SELECT * FROM sensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Sensors: ", res);
        result(null, res);
    });
};

Sensor.updateById = (id, Sensor, result) => {
    sql.query(
        "UPDATE sensor SET node = ?,gwc = ?,LightIntensity = ?, AmbiantTemperature = ?,SoilTemperature = ?, AmbiantRH = ?,humidity2 = ? ,updatedAt = ? WHERE id = ?",
        [Sensor.node, Sensor.gwc, Sensor.LightIntensity, Sensor.AmbiantTemperature, Sensor.SoilTemperature, Sensor.AmbiantRH, Sensor.SoilMoisture, Sensor.updatedAt, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Sensor with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Sensor: ", { id: id, ...Sensor });
            result(null, { id: id, ...Sensor });
        }
    );
};

Sensor.remove = (id, result) => {
    sql.query("DELETE FROM sensor WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sensor with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Sensor with id: ", id);
        result(null, res);
    });
};

Sensor.removeAll = result => {
    sql.query("DELETE FROM sensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Sensors`);
        result(null, res);
    });
};

module.exports = Sensor;
