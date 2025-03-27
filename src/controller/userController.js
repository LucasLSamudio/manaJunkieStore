const { v4: uuidv4, validate } = require('uuid'); // id : uuidv4(),
const bcrypt = require('bcrypt'); // password : bcrypt.hashSync(password, 10)  |  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const userController = {
    login: (req, res) => {
        let error = "";
        res.render('users/login', {
            error,
            title: "Iniciar Sesión"
        })
    },
    processLogin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const {email, password} = req.body
        const user = users.find(u => bcrypt.compareSync(email, u.email) && bcrypt.compareSync(password, u.password)) 
        if(!user){
            return res.render('users/login',{
                title:"Iniciar Sesión",
                error: "Error al iniciar sesión. Datos incorrectos.",
            });
        }else{
            const { id, firstName, type, avatar} = user;
            req.session.user = { email, firstName, id, type, avatar };
            res.locals.usuarioLogueado = {...req.session.user}
            res.cookie("user", { email, firstName, id, avatar}, {maxAge: 1000*60*30})
            return res.redirect(`/`)
        }
    },

    register: (req, res) => {
        res.render('users/register', {
            title: "Registrarse"
        })
    },
    processRegister: (req, res) => {
        const {firstName, lastName, password, email, phone} = req.body;

        const newUser = {
            id : uuidv4(),
            firstName: firstName.trim(),
            lastName : lastName.trim(),
            email : bcrypt.hashSync(email,5),
            password : bcrypt.hashSync(password,5),
            phone : phone,
            type : 'user',
            avatar : "defaultAvatar.jpg",
        }
        
        users.push(newUser);
        fs.writeFileSync(path.join(__dirname, '../db/users.json'),JSON.stringify(users, null, 3),'utf-8')
        
        return res.redirect('/users/login')
    },
    profile: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const {id} = req.session.user
        const u = users.find(user => user.id === id)
        res.render('users/profile',{ 
            title: "Perfil",
            ...u
        })
    },
    update: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const id = req.params.id;
        req.body.avatar = req.file ? req.file.filename : user.avatar
        const user = users.map(user => {
            if(user.id === id){
                user.avatar = req.body.avatar
            };
            return user
        });
        fs.writeFileSync(path.join(__dirname, '../db/users.json'),JSON.stringify(user, null, 2),'utf-8');
        res.redirect('/');
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("user");
        res.redirect("/users/login");
    },

    cookiePrueba: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));       
        res.send(`
            El usuario <strong> ${req.session.user.firstName} </strong>
            con rol <strong> ${req.session.user.type} </strong>
            `)
    }
}

module.exports = userController;