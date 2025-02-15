const adminCheck = (req, res, next) => {
    console.log("Sesión en adminCheck:", req.session.userLogin);
    if (req.session.userLogin && req.session.userLogin.type == 'admin'){
        return next();
    }    
    res.redirect('/');
    }

module.exports = adminCheck;