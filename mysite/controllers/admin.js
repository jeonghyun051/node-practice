const models = require('../models');
const fs = require('fs');
const path = require('path');
const { gzip } = require('zlib');

module.exports = {
    index: async function(req, res, next){
        try{
            const result = await models.Site.findOne({
                attributes: ['title','welcome','profile','decription']
            }) 
            console.log("result:" + result);    
            res.render('admin/main',{
                vo : result 
            });
        } catch(err) {
            next(err);
        }         
    },
    update: async function(req, res, next){
        try{
            const file = req.file;

            const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.MAIN_STORE_LOCATION);
            
            const url = path.join(process.env.MAIN_STORE_LOCATION, file.filename) + path.extname(file.originalname);

            const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname)

            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: 'w+'});

            await models.Site.update({
               title: req.body.title,
               welcome: req.body.welcome,
               profile: url.replace(/\\/gi, '/'),
               decription: req.body.decription || ''
            },{ where: {}
        });

            res.render('admin/main');
        } catch(err) {
            next(err);
        }   
    }
}