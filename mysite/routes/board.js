const express = require('express');
const controller = require('../controllers/board');

const router = express.Router();

router.route("/write/:boardNo/:groupNo").get(controller.write);
router.route("/write/:boardNo/:groupNo").post(controller._write);
router.route("/:page").get(controller.index);
router.route("/view/:no").get(controller.view);
router.route("/modify/:no").get(controller.modify);
router.route("/modify/:no").post(controller._modify);


module.exports = router;