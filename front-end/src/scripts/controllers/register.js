import registerView from '../views/register.art'
import httpModel from '../models/http'
export const register = (req,res,next)=>{
   
    res.render(registerView())

    new Register()
}
    class Register{
        constructor(){
            this.render()
        }
        render(){
           
    
            $('#signupSubmit').on('click',this.handleSubmit.bind(this,'/api/users/signup'))
    
        }
        async handleSubmit(url){
    
            let data=$('.layui-form').serialize()
            console.log(data)
            let result=await httpModel.get({
                url,
                type:'POST',
                data,
            })
            
            this.handleSubmitSucc(result)
           
        }
    
        handleSubmitSucc(result){
            // console.log(result)
            $('.layui-form').get(0).reset();
            
            if(result.ret){
                location.hash="#/login"
            }
           
                alert(result.data.message)
        }
    }