const express = require('express');
const router = express.Router();
const weatherCtrl = require('../controllers/weatherController');
router.get('/:cep/:date', weatherCtrl.weatherByCepAndDate);
module.exports = router;
