const { v4: uuidv4, validate } = require('uuid'); // id : uuidv4(),
const bcrypt = require('bcrypt'); // password : bcrypt.hashSync(password, 10)  |  const user = users.find(user => user.email === email && bcrypt.compareSync(password, user.password))
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const {User} = require('../database/models')

const userController = {
    login: (req, res) => {
        let error = "";
        res.render('users/login', {
            error,
            title: "Iniciar Sesión"
        })
    },
    processLogin: async (req, res) => {

        try {
            const {email, password} = req.body

            const user = await User.findOne({ 
                where: { email },
                include : ['rol'] 
            });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.render('users/login', {
                    title:"Iniciar Sesión",
                    error: "Error al iniciar sesión. Datos incorrectos.",
                });
            }

            const { id, firstName, rol} = user;
            req.session.user = { email, firstName, id, rol };

            res.locals.usuarioLogueado = {...req.session.user}
            res.cookie("user", { email, firstName, id}, {maxAge: 1000*60*30})
            return res.redirect(`/`)

        } catch (error) {
            console.log(error);
        }
    },

    register: (req, res) => {
        res.render('users/register', {
            title: "Registrarse"
        })
    },
    processRegister: async (req, res) => {

        try {
            const {firstName, lastName, password, email, phone} = req.body;

            if([firstName, lastName, password, email].includes('')){
                return res.render('users/register',{
                    title : 'Registrarse',
                    error : 'Todos los campos señalados con "*" son obligatorios'
                })
            }

            const user = await User.findOne({ where: { email } })

            if(user) return res.render('users/register',{
                title : 'Registrarse',
                error : 'El email ya se encuentra registrado'
            });

            await User.create({
                firstName: firstName.trim(),
                surname: lastName.trim(),
                email: email.trim(),
                phone,
                password: bcrypt.hashSync(password, 10),
                token: null, 
                validate: true, 
                lock: false,
                idRol: 2,
            });

            return res.redirect('/users/login');


        } catch (error) {
            console.log(error);
            
        }

    },
    profile: async (req, res) => {
        try {
            const {id} = req.session.user
            const user = await User.findByPk(id);
            console.log(user);
            
            res.render('users/profile',{ 
                title: "Perfil",
                ...user.dataValues
            })

        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        // return res.send(req.file)
        try {
            const {id} = req.session.user
            // TODO: VALIDAR QUE EL USUARIO EXISTA

            const {firstName, lastName, email, phone} = req.body;

            await User.update(
                {
                    firstName: firstName.trim(),
                    surname: lastName.trim(),
                    email: email.trim(),
                    phone,
                },
                {
                    where : {
                        id
                    }
                }
            )
            res.redirect('/users/profile');

           
        } catch (error) {
            console.log(error);
            
        }
      
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