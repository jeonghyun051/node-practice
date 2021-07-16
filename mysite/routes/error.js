const logger = require('../logging');

module.exports = {
    error404: function(req, res){
    if(req.accepts('html')) {
        res.status(404).render('error/404')
        return;
    }

    res.status(404).send({
        result: 'fail',
        data: null,
        message: 'Unknown Request'
    });
},
    error500: function(err, req, res, next){
        // logging 
        logger.error(err.stack);

        // 응답
        if(res.accepts('html')){    
            res.status(500).send(`<pre>${err.stack}</pre>`); // statck 내용을 보냄, <pre>:내용 그대로 보여줘라. 
            //res.status(500).render('error/500'); // 500 페이지를 보냄
            return;
         }

        res.status(500).send({ // spring global 
            result: 'faul',
            data: null,
            message: err.stack
        });
    }
}