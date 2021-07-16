module.exports = function(role) { // 클로저, 함수내에서 사용가능
    return function(req, res, next) {
        if(req.session.authUser && (role !== 'ADMIN' || req.session.authUser.role === 'ADMIN')){ // admin 이 아니면 
            next();
            return;
        }
        if(req.accepts('html')) {
            res.redirect(req.session.authUser ? '/' : '/user/login');
            return;
        }

        res.send({
            result: "fail",
            data: null,
            message: "Access Define"
        })
    }
}