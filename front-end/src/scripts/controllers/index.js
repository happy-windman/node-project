import layoutView from '../views/layout.art'
import httpModel from '../models/http'

class index{
    constructor(){
        this.render()
    }
    render(){
        console.log(11)
        let html=layoutView({})
        $('#root').html(html)

        this.issignin()
        $('.top-admin dl dd').eq(2).on('click',this.signout)
    }

    async issignin(){
        let result=await httpModel.get({
            url:'/api/users/issignin',
            type:'GET'
        })
        console.log(result)
        if(result.data.username)
        {
            $('.top-admin').show()
            $('.top-login').hide()
            $('.top-register').hide()
            $('.top-admin a').eq(0).html(`欢迎您，${result.data.username}`)
            // $('.logout').show()
        } else {
            $('.top-admin').hide()
            $('.top-login').show()
            $('.top-register').show()
        }
    }

    async signout(){
        console.log(111)
        let result=await httpModel.get({
            url:'/api/users/signout',
            type:'GET'
        })
       
        location.reload()
    }
}

export default new index()