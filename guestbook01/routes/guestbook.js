const express = require('express');
const controller = require('../controllers/guestbook');

const router = express.Router();
router.route('').get(controller.index);
router.route('/add').post(controller.add);
router.route('/delete/:no').get(controller.delete);

module.exports = router;