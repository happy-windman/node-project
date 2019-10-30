import findPasswordView from '../views/findpassword.art'
import httpModel from '../models/http'

export const findPassword = (req,res,next)=>{
 
    res.render(findPasswordView())

    $('#getCode').on('click',async function(){
        let data = $('#findpassword').serialize()
        let result = await httpModel.get({
            url:'api/users/sendEmail',
            type:'POST',
            data
        })
            alert(result.data.message)
    })
    $('#findpasswordSubmit').on('click',async function(){
        let data = $('#findpassword').serialize()
        let result = await httpModel.get({
            url:'api/users/findpassword',
            type:'POST',
            data
        })
        console.log(result)
        alert(result.data.message)
    })
} 