import loginView from '../views/login.art'
import httpModel from '../models/http'

export const login = (req,res,next)=>{
    console.log(111)
    res.render(loginView())

new Login()
}  
class Login {
        constructor(){
            this.render()
        }
    render(){
        console.log(this)
      
        $('#signinSubmit').on('click',this.handleSubmit.bind(this,'/api/users/signin'))
      
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
        if(result.ret)
        {
            location.hash='/home'
            location.reload()
         
        }
      
       
            alert(result.data.message)
    }
}