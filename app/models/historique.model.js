const sql = require("./db.js");

const Historique = function (Historique) {
    this.id = Historique.id;
    this.date = Historique.date;
    this.valeur = Historique.valeur;
};

Historique.create = (newHistorique, result) => {
    sql.query("INSERT INTO Historique SET ?", newHistorique, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Historique: ", { id: res.insertId, ...newHistorique });
        result(null, { id: res.insertId, ...newHistorique });
    });
};

Historique.findById = (HistoriqueId, result) => {
    sql.query(`SELECT * FROM Historique WHERE id = ${HistoriqueId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Historique: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Historique with the id
        result({ kind: "not_found" }, null);
    });
};
// Historique.findByNode = (node, result) => {
//     sql.query(`SELECT * FROM Historique WHERE node = "${node}"`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         if (res.length) {
//             console.log("found Historique: ", res[0]);
//             result(null, res[0]);
//             return;
//         }

//         // not found Historique with the id
//         result({ kind: "not_found" }, null);
//     });
// };

Historique.getAll = result => {
    sql.query("SELECT * FROM Historique", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Historiques: ", res);
        result(null, res);
    });
};

Historique.updateById = (id, Historique, result) => {
    sql.query(
        "UPDATE Historique SET date = ?,valeur = ? WHERE id = ?",
        [Historique.date, Historique.valeur, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Historique with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Historique: ", { id: id, ...Historique });
            result(null, { id: id, ...Historique });
        }
    );
};

Historique.remove = (id, result) => {
    sql.query("DELETE FROM Historique WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Historique with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Historique with id: ", id);
        result(null, res);
    });
};

Historique.removeAll = result => {
    sql.query("DELETE FROM Historique", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Historiques`);
        result(null, res);
    });
};

module.exports = Historique;