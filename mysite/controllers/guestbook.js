const models = require('../models');
const moment = require('moment');
module.exports = {
    index: async function(req, res) {
        const results = await models.Guestbook.findAll({
            order: [
                ['no','DESC']
            ]}
        );
        res.render('guestbook/list',{
            list: results || [],
            moment: moment
        });
    },
    delete: async function(req, res){
        res.render('guestbook/delete',{
            no: req.params.no || 0
        });
    },
    _delete: async function(req, res){
        const result = await models.Guestbook.destroy({ // 성공하면 1, 실패하면 0
            where: {
                no: req.body.no,
                password: req.body.password
            }
        });
        res.redirect('/guestbook');
    },
    add: async function(req, res){
        const result = await models.Guestbook.create({
            name: req.body.name,
            password: req.body.password,
            message: req.body.content,
            reg_date: new Date()
        });
        res.redirect('/guestbook');
    }
}