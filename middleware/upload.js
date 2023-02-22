const multer = require('multer');

const Storge = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null , 'uploads')
    },
    filename: (req,file,cb)=>{
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)){
            return cb (new Error('please upload an image'))
        }else{
            cb(null , `${Date.now()}--${file.originalname}`)
        }
    }
});

const upload = multer({
    storage : Storge ,
    limit:{fileSize:1000000}
});

module.exports = upload;

