var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('red_compartida/index', { title: 'Contrataciones Abiertas' });
});

var app = express();

/* URL para del cdn de datos.gob.mx usado para cargar navbar y footer */
app.set('env', process.env.ENV || 'development');
app.settings.env = app.get('env');
process.env.CDN_URL = process.env.CDN_URL || 'http://cdn.datos.gob.mx';

module.exports = router;
