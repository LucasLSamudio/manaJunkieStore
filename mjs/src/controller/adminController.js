const {dataBasic} = require('../../utils/fileSystem')

const adminController  = {
    index:(req,res) =>{
        res.render('admin',{
            ...dataBasic
        })
    }
}

module.exports = adminController