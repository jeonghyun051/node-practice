const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbook-api');

router.route('/:no').get(controller.read);
router.route('/:no').delete(controller.delete);
router.route('').post(controller.create);

module.exports = router;