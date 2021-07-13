const express = require('express');
const controller = require('../controllers/guestbook');

const router = express.Router(); // 분기 작업
router.route('').get(controller.index);
router.route('/add').post(controller.add);
router.route('/delete/:no').get(controller.deleteForm);
router.route('/delete').post(controller.delete);


module.exports = router;