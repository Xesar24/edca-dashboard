var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('puertos', { title: 'Contrataciones Abiertas' });
});

var app = express();

/* URL para del cdn de datos.gob.mx usado para cargar navbar y footer */
app.set('env', process.env.ENV || 'development');
app.settings.env = app.get('env');
process.env.CDN_URL = process.env.CDN_URL || 'https://cdn.datos.gob.mx';

module.exports = router;
