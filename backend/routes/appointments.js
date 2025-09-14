const express = require('express');
const router = express.Router();
const apptCtrl = require('../controllers/appointmentController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, apptCtrl.create);
router.get('/me', auth, apptCtrl.listForUser);
router.get('/', auth, apptCtrl.listAll); // admin

module.exports = router;
