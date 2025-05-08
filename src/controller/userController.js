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

            const errors = validationResult(req);
            // // console.log("\\nLog de errors", errors);
            
            if (!errors.isEmpty()) {
                // console.log("\n Log de errors: \n", errors);
                error = "";

                return res.render('users/login', {
                    errors: errors.mapped(),
                    error,
                    oldData: req.body,
                    title: "Iniciar sesión"
                });
            }

            const user = await User.findOne({ 
                where: { email },
                include : ['rol'] 
            });
            if (user && !bcrypt.compareSync(password, user.password)|| !user ) {
                // console.log("fallo con exito");
                
                return res.render('users/login', {
                    title:"Iniciar Sesión",
                    error: "Error al iniciar sesión. Datos incorrectos.",
                });
            }

            const { id, firstName, rol, avatar} = user;
            req.session.user = { email, firstName, id, rol, avatar };

            res.locals.usuarioLogueado = {...req.session.user}
            res.cookie("user", { email, firstName, id}, {maxAge: 1000*60*30})
            console.log(res.locals.usuarioLogueado);
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
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // console.log("\n Log de errors: \n", errors);
                error = "";

                return res.render('users/register', {
                    errors: errors.mapped(),
                    error,
                    oldData: req.body,
                    title: "Registro De Usuario"
                });
            }
            // if([firstName, lastName, password, email].includes('')){
            //     return res.render('users/register',{
            //         title : 'Registrarse',
            //         error : 'Todos los campos señalados con "*" son obligatorios'
            //     })
            // }

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
                avatar: 'defaultAvatar.jpg',
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
            const {id, avatar} = req.session.user
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

            // si cargo imagenes en el input fipo file
            if(req.file){

                // obtengo las imágenes de la base de datos

                if(avatar != 'defaultAvatar.jpg'){
                    const pathFile = path.join(__dirname,`../../public/images/users/${avatar}`)
                    await fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
                }
                await User.update(
                    {
                        avatar : req.file.filename
                    },
                    {
                        where : {
                            id
                        }
                    }
                )
                res.locals.usuarioLogueado.avatar = req.file.filename 

                // elimino los archivos (físicos)

                // agrego las 'nuevas' imágenes
                // await User.update({ avatar : req.file.filename });
            }
            res.redirect('/');

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