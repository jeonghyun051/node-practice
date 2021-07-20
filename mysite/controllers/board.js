const models = require('../models');
const moment = require('moment');
module.exports = {
    index: async function(req, res) {
        const no = req.params.pages || 0;
        const results = await models.Board.findAll({
            where: {
            },
            include: {
                model: models.User,
                required: true
            },
            order: [
                ['groupNo','DESC'],['orderNo','ASC']
            ],
            offset: no, limit: 5
        });
        res.render('board/list',{
            list: results,
            moment: moment
        });
    },
    view: async function(req, res){
        const no = req.params.no;
        const result = await models.Board.findOne({
                where: {
                    no: no
                }
            })
        res.render('board/view',{
            vo: result,
            no: no
        });
    },
    write: function(req, res){
        res.render('board/write',{
            boardNo: req.params.boardNo,
            groupNo: req.paras.groupNo
        });
    },
    _write: async function(req, res){
        try {        
            // await models.Board.create(req.body);
            res.redirect('/board/0');
        } catch(e) {
            next(e);
        }        
    },
    modify: async function(req,res){
        const no = req.params.no;
        const result = await models.Board.findOne({ 
            where: {
                no: no
            }    
        })
        res.render('board/modify',{
            no: no,
            vo: result
        });
    },
    _modify: async function(req,res){
        try {
            const no = req.params.no;
            await models.Board.update(req.body,{
                where: {
                    no: no
                }
            });
            res.redirect("/board/view/"+no);
        } catch(err) {
            console.log(err.message);
        }
    }
}