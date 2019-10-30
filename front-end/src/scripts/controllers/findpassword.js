import findPasswordView from '../views/findpassword.art'
import httpModel from '../models/http'

export const findPassword = (req,res,next)=>{
 
    res.render(findPasswordView())


} 