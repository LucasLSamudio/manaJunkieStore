const adminCheck = (req, res, next) => {
    if (req.session.user && req.session.user.type == 'admin'){
        return next();
    }    
    res.redirect('/');
    }

module.exports = adminCheck;