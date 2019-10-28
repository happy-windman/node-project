const issignin=async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
  
    if(req.session.username)
    {
        if(req.path=='/findAll')
        {
             next()
        }
        else 
            res.render('succ',{
            data:JSON.stringify({username:req.session.username})
            })
    }
    
    else {
        res.render('fail',{
            data:JSON.stringify({message:'未登录，无权限'})
        })
    }
}

module.exports = issignin