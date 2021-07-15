const logger = require('../logging');

module.exports = {
    error404: (req, res) => res.status(404).render('error/404'),
    error500: function(err, req, res, next){
        // logging 
        logger.error(err.stack);
        // 사과 페이지
        res.status(500).send(`<pre>${err.stack}</pre>`); // statck 내용을 보냄, <pre>:내용 그대로 보여줘라. 
        //res.status(500).render('error/500'); // 500 페이지를 보냄
    }
}