const express = require('express');
const inquiryController = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', inquiryController.createInquiry);

module.exports = router;