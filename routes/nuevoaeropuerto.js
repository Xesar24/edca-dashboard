var express = require('express');
var router = express.Router();

var pgp = require('pg-promise')();

var edca_db;

if ( typeof process.env.EDCA_DB != "undefined" ){
    console.log("EDCA_DB: ", process.env.EDCA_DB);
    edca_db = pgp( process.env.EDCA_DB );
} else {
    console.log("Warning: EDCA_DB env variable is not set\n " +
        " defaulting to -> postgres://tester:test@0.0.0.0/edca");
    edca_db = pgp("postgres://tester:test@172.17.0.3/edca");
}

/* dashboard contract list (1st page) */
router.get('/',function (req, res) {
    edca_db.task(function (t) {
        return this.batch([
            this.one('select count (*)  as total from (select distinct identifier_id  from supplier) as t ;'),
            this.one('select count (*) as total from contractingprocess'),
            this.one('select count (*) as total from contract where value_amount > 0'),
            this.one('select sum(value_amount) as total from contract'),
            this.manyOrNone("select tender.procurementmethod, sum (contract.value_amount) as total , count(*) as conteo from contract, tender " +
                "where contract.contractingprocess_id=tender.contractingprocess_id group by tender.procurementmethod order by total desc"),
            this.manyOrNone("select destino, sum(contract.value_amount) as total_amount, count(*) as conteo from contract, contractingprocess " +
                "where contract.contractingprocess_id= contractingprocess.id group by destino order by total_amount desc;")
        ]);
    }).then(function (data) {
        res.render('dashboard',{ title: 'Contrataciones Abiertas',
            metadata : {
                supplier_count: +data[0].total,
                cp_count: +data[1].total,
                contract_count: +data[2].total,
                contract_value_amount_total: data[3].total,
                total_procedimiento: data[4],
                destinos : data[5]
            }
        });

    }).catch(function (error) {
        console.log("ERROR: ", error);
    });
});

module.exports = router;