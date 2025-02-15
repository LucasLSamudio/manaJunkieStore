const userSessionCheck = (req, res, next) => {
    if(req.session.userLogin){
        return next();
    }
    res.redirect('/');
    }

module.exports = userSessionCheck;