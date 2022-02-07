const sql = require("./db.js");

// constructor
const Measure = function (Measure) {
    this.node = Measure.node;
    this.temp1 = Measure.temp1;
    this.temp2 = Measure.temp2;
    this.humidity1 = Measure.humidity1;
    this.humidity2 = Measure.humidity2;
    this.date = Measure.date;
};

Measure.create = (newMeasure, result) => {
    sql.query("INSERT INTO measure SET ?", newMeasure, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Measure: ", { id: res.insertId, ...newMeasure });
        result(null, { id: res.insertId, ...newMeasure });
    });
};

Measure.findById = (MeasureId, result) => {
    sql.query(`SELECT * FROM measure WHERE id = ${MeasureId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Measure: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Measure with the id
        result({ kind: "not_found" }, null);
    });
};

Measure.getAll = result => {
    sql.query("SELECT * FROM measure", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Measures: ", res);
        result(null, res);
    });
};

Measure.updateById = (id, Measure, result) => {
    sql.query(
        "UPDATE measure SET node = ?, temp1 = ?,temp2 = ?, humidity1 = ?,humidity2 = ? WHERE id = ?",
        [Measure.node, Measure.temp1, Measure.temp2, Measure.humidity1, Measure.humidity2, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Measure with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Measure: ", { id: id, ...Measure });
            result(null, { id: id, ...Measure });
        }
    );
};

Measure.remove = (id, result) => {
    sql.query("DELETE FROM measure WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Measure with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Measure with id: ", id);
        result(null, res);
    });
};

Measure.removeAll = result => {
    sql.query("DELETE FROM measure", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Measures`);
        result(null, res);
    });
};

module.exports = Measure;
