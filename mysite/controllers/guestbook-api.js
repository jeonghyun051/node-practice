const models = require('../models');
const moment = require('moment');
const { Sequelize } = require('sequelize');

module.exports = {
    create: async function(req, res, next) {
        try {        
            await models.Guestbook.create(req.body);
            res.status(200).send({
            result: 'success',
            data: (req.body), // Object.assign : 복사 기능
            message: null
        });
        } catch(e) {
            next(e);
        }     
    },
    read: async function(req, res, next) {
        const no = req.params.no || 0;

        // sql: select.... limit
        if(no == 0){
            const results = await models.Guestbook.findAll({
                order: [['no','DESC']],
                offset: 0, limit: 3
            });
            res.status(200).send({
                result: 'success',
                data: results || [],
                message: null
            });
        } else {
            const results = await models.Guestbook.findAll({   
                where:{
                    no: { [Sequelize.Op.lt] : no }  
                },
                order: [['no','DESC']],
                offset: 0, limit: 3
            });
            res.status(200).send({
                result: 'success',
                data: results || [],
                message: null
            });
        }
    },
    delete: async function(req, res, next) {
        try {        
            const result = await models.Guestbook.destroy({ // 성공하면 1, 실패하면 0
                where: {
                    no: req.params.no,
                    password: req.body.password
                }
            });
            res.status(200).send({
                result: 'success',
                data: result == 1 ? req.params.no : -1, 
                message: null
            });
        } catch(e) {
            next(e);
        }     
    }
}