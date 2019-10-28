const mongoose = require('mongoose');
 
mongoose.connect('mongodb://127.0.0.1:27017/web-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Users=mongoose.model('users',{
    username:String,
    password:String,
})
module.exports={
    Users
}