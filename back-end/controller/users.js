const usersModel=require('../models/users')
const tools=require('../utils/tools')
const authMiddlewares=require('../middlewares/auth')


const signup = async function(req, res, next) {
    res.set('Content-Type', 'application/json; charset=utf-8')
   let {username,password}=req.body
   let hash=tools.hash(password)
   let result=await usersModel.save({
        username,
        password:hash
    })
    
    if(result){
        res.render('succ',{
        data:JSON.stringify({message:'注册成功！'})
    })
    }
    else {
        res.render('fail',{
            data:JSON.stringify({message:'注册失败！'})
        })
    }
  }


const hasUsername= async function(req,res,next){
    let {username} =req.body
    res.set('Content-Type', 'application/json; charset=utf-8')
    let result=await usersModel.findOne({username})
    if(result)
       {
            res.render('fail',{
            data:JSON.stringify({message:'账号已被注册！'})
            })
       } 
    else {
        next()
    }
    
    

}

const signin=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let {username,password}=req.body
    let result=await usersModel.findOne({username})

    if(result){
        let compareResult=await tools.compare(password,result.password)
        
        if(compareResult){
         
             let token=await tools.generateToken(username)
        
            res.set('X-Access-Token',token)
            res.render('succ',{
            data:JSON.stringify({message:'登陆成功',currentUsername:username})
        })
        } else {
            res.render('fail',{
                data:JSON.stringify({message:'账号或密码不正确'})
            })
        }
    } else {
        res.render('fail',{
            data:JSON.stringify({message:'账号或密码不正确'})
        })
    }
}
const issignin=authMiddlewares

const signout=function(req,res,next){
    req.session=null
    res.set('Content-Type', 'application/json; charset=utf-8')
    res.render('succ',{
        data:JSON.stringify({message:'注销成功'})
    })
}

const findpassword = function (req,res,next){

}
  module.exports = {
      signup,
      hasUsername,
      signin,
      issignin,
      signout,
      findpassword
  }