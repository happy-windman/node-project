var multer  = require('multer')
var path = require('path')
var randomstring = require('randomstring')
// var upload = multer({ 
//     dest: path.resolve(__dirname,'../public/uploads')
// })

let imgMap={
    'image/jpeg':'.jpeg',
    'image/png':'.png',
    'image/gif':'.gif',
    'image/jpg':'.jpg',
}

var filename = ''

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../public/uploads'))
    },
    filename: function (req, file, cb) {
        filename = file.fieldname + '-' + randomstring.generate(6)+imgMap[file.mimetype]
      cb(null, filename)
    
    }
  })

  var upload = multer({storage:storage}).single('companyLogo')
module.exports = (req,res,next) =>{
    upload(req, res, function (err) {
      req.filename = filename
      next() 
      })
}