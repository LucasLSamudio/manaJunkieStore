const multer = require("multer");
const {v4 : uuidv4} = require('uuid');
const path = require('path')

// V1

const storage = multer.diskStorage({
    destination: function(req, file, cb){        
        cb(null, path.join(__dirname,`../../public/images/${file.fieldname == 'avatar' ? 'users' : 'products'}`));
    },

    filename: function(req, file, cb){
        const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`
        cb(null, uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    const filtro = /\.(jpg|jpeg|png)$/;
    if (filtro.test(file.originalname)){
        req.body.existFile = true
        cb(null, true);
    }else{
        req.body.existFile = false
        req.errorValidationImage = "No es un tipo de archivo válido.";
        cb(null, false);
    }
};

// V2

// function manejoDeFotos (archivos) {
//     const newArray = archivos.length>1 ? [...archivos] : [archivos];
//     return newArray;
// }
// const upload = multer({
//     dest: 'public/images/users',
//     fileFilter: ff
// }
    // (req: express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void
// );
  // FUNCIONA GRACIAS A POSTMAN Y NO GRACIAS A THUNDER CLIENT

// app.post('/images/single', upload.single('imagenPerfil'), (req, res) => {
//     const x = manejoDeFotos(req.file);
//     x.map(saveImage);
// })

// app.post('/images/multi', upload.array('photos', 5), (req, res) => {
//     const x1 = manejoDeFotos(req.files);
//     x1.map(saveImage);
// })

  // ff tiene que saber si es array o simple (fijarse si se puede usar forEach)

// function ff (req, file, cb){
//     const filtro = /\.(jpg|jpeg|png|gif)$/;
//     if(filtro.test(file.originalname)){
//     cb(null, true);
//     }else{
//     req.errorValidationImage = "No se acepta este formato de imagenes."
//     cb(null, false);
//     }
// }

// function saveImage (file) {
//     const newPath = `public/images/users/${file.originalname}`;
//     fs.renameSync(file.path, newPath);
//     return newPath;
// }

module.exports = multer({storage, fileFilter});