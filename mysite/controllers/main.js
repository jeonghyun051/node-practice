const models = require('../models');

module.exports = {
    index: async function(req, res, next){
        try{
            const result = await models.Site.findOne({
                attributes: ['title','welcome','profile','decription']
            }) 
            res.render('main/index',{
                vo : result 
            });
        } catch(err) {
            next(err);
        }         
    },
}