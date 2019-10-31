const tools=require('../utils/tools')
const issignin=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let token=req.get('X-Access-Token')
    let decoded=await tools.verifyToken(token)
  
    if(token)
    {
        if(req.path=='/issignin')
        {   
             res.render('succ',{
            data:JSON.stringify({username:decoded.username})
            })
        }
        else {
            if(decoded)
            {
                next()
            } else {
                res.render('fail',{
                    data:JSON.stringify({message:'token验证失败'})
                })
            }   
        }   
    }
    else {
        res.render('fail',{
            data:JSON.stringify({message:'未登录，无权限'})
        })
    }
}

module.exports = issignin