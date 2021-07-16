const models = require('../models');

module.exports = {
    index: async function(req, res, next) {
        try { 
            res.render('gallery/index');
        } catch(err) {
            next(err);
        }         
    }
}