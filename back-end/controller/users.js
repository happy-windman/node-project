const usersModel=require('../models/users')
const tools=require('../utils/tools')

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
    
    console.log(req.body)
    if(result){
        let compareResult=await tools.compare(password,result.password)
       
        if(compareResult){
             req.session.username=username
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

const issignin=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    if(req.session.username)
    res.render('succ',{
        data:JSON.stringify({username:req.session.username})
    })
    else {
        res.render('fail',{
            data:JSON.stringify({message:'未登录，无权限'})
        })
    }
}
const signout=function(req,res,next){
    req.session=null
    res.set('Content-Type', 'application/json; charset=utf-8')
    res.render('succ',{
        data:JSON.stringify({message:'注销成功'})
    })
}
  module.exports = {
      signup,
      hasUsername,
      signin,
      issignin,
      signout
  }