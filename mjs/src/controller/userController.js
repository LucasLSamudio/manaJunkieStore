const { v4: uuidv4, validate } = require('uuid'); // id : uuidv4(),
const bcrypt = require('bcrypt'); // password : bcrypt.hashSync(password, 10)  |  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))
const fs = require('fs');
const path = require('path');

const userController = {
    login: (req, res) => {
        let error = "";
        res.render('users/login', {
            error,
            title: "Iniciar Sesión"
        })
    },
    processLogin: (req, res) => {
        let error = "";
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const {email, password} = req.body

        const user = users.find(u => u.email === email && bcrypt.compareSync(password, u.password)) 
        
        if(!user){
            return res.render('users/login',{
                error: "Credenciales inválidas",
                title: "Iniciar sesión"
            })
        }

        
        
        req.session.userLogin = {
            id : user.id,
            name : user.firstName,
            type : user.type,
            countVisited : user.countVisited
        };

        user.countVisited++;
        const modifyUser = users.map(u => {
            if (u.id === +user.id) {
                u.countVisited = user.countVisited;
            }
            return u;
        });

        res.cookie('usuario', user.firstName,{maxAge: 1000*60*10000});
        req.session.userLogin.countVisited = user.countVisited;
    
        // fs.writeFileSync(path.join(__dirname, '../db/users.json'),JSON.stringify(modifyUser, null, 3),'utf-8')

        return res.redirect('/');
        },

    register: (req, res) => {
        res.render('users/register', {
            
            title: "Registrarse"
        })
    },
    processRegister: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        const {firstName, lastName, password, email, phone} = req.body;

        const newUser = {
            id : uuidv4(),
            firstName: firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            password : bcrypt.hashSync(password,10),
            phone : phone,
            type : 'Customer',
            avatar : "defaultAvatar.jpg",
            countVisited : 0
        }
        
        users.push(newUser);
        fs.writeFileSync(path.join(__dirname, '../db/users.json'),JSON.stringify(users, null, 3),'utf-8')
        
        return res.redirect('/users/login')
    },
    profile: (req, res) => {

    },
    update: (req, res) => {

    },
    logout: (req, res) => {
        
    },

    cookiePrueba: (req, res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../db/users.json'),'utf-8'));
        console.log(users);
        
        req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
        res.send(`
            El usuario <strong> ${req.session.usuario} </strong>
            con rol <strong> ${req.session.rol} </strong>
            ha visitado la página <strong> ${req.session.visitas} vez/veces. </strong>
            `)
    }
}

module.exports = userController;