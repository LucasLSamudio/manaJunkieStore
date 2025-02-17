const adminCheck = (req, res, next) => {
    console.log("Sesión en adminCheck:", req.session.user);
    if (req.session.user && req.session.user.type == 'admin'){
        return next();
    }    
    res.redirect('/');
    }

module.exports = adminCheck;