const sql = require("./db.js");

const SerreSensor = function (SerreSensor) {
    this.id = SerreSensor.id;
    this.date = SerreSensor.date;
    this.valeur = SerreSensor.valeur;
    this.node = SerreSensor.node;
};

SerreSensor.create = (newSensor, result) => {
    sql.query("INSERT INTO Sensor SET ?", newSensor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Sensor: ", { id: res.insertId, ...newSensor });
        result(null, { id: res.insertId, ...newSensor });
    });
};

SerreSensor.findById = (SensorId, result) => {
    sql.query(`SELECT * FROM Sensor WHERE id = ${SensorId}`, (err, res) => {
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
// SerreSensor.findByNode = (node, result) => {
//     sql.query(`SELECT * FROM Sensor WHERE node = "${node}"`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found Sensor: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found Sensor with the id
//         result({ kind: "not_found" }, null);
//     });
// };

SerreSensor.getAll = result => {
    sql.query("SELECT * FROM Sensor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Sensors: ", res);
        result(null, res);
    });
};

SerreSensor.updateById = (id, Sensor, result) => {
    sql.query(
        "UPDATE Sensor SET date = ?,valeur = ? WHERE id = ?",
        [Sensor.date, Sensor.valeur, id],
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

SerreSensor.remove = (id, result) => {
    sql.query("DELETE FROM Sensor WHERE id = ?", id, (err, res) => {
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

SerreSensor.removeAll = result => {
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

module.exports = SerreSensor;