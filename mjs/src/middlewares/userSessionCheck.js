const userSessionCheck = (req, res, next) => {
    if(req.session.user){
        res.locals.usuarioLogueado = req.session.user
        return next();
    }
    res.redirect('/');
}

const loginVerify = (req, res, next) => {
    if (req.session.user) {

        res.redirect("/users/profile/" + req.session.user.id);
    } else {
        next();
    }
};

module.exports = userSessionCheck, loginVerify;