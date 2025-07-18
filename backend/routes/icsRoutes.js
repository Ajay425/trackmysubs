const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddlewares');
const { generateCalender  } = require('../controllers/icsController');

router.get('/calendar', protect, generateCalender ); // Endpoint to get the ICS file

module.exports = router;