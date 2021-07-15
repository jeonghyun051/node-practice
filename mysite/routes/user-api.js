const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/user-api');

const router = express.Router();

router.route('/checkemail').get(controller.checkemail);
router.route('/needauth').get(authorized, function(req,res) {
    res.send({
        reulst: "success"
    })
});

module.exports = router;