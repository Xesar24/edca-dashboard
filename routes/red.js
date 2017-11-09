var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('red_compartida/index', { title: 'Contrataciones Abiertas' });
});

module.exports = router;