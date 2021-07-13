const model = require('../models/guestbook')

module.exports = {
    index: async function(req, res) {
        const results = await model.findAll();
        res.render('index',{
            list: results || []
        });
    },
    add: async function(req, res) {
        const results = await model.insert(req.body);
        res.redirect("/");
    },
    delete: async function(req, res) {
        no= req.params.no || 0
        const results = await model.delete(no);
        res.redirect("/");
    }
}