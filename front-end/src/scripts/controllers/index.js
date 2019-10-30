import layoutView from '../views/layout.art'
import httpModel from '../models/http'
import store from 'store'

class index{
    constructor(){
        this.render()
    }
    async render(){
        console.log(11)
        let html=layoutView({})
        $('#root').html(html)

       await this.issignin()
        $('.top-admin dl dd').eq(2).on('click',this.signout)
    }

    async issignin(){
        let result=await httpModel.get({
            url:'/api/users/issignin',
            type:'GET'
        })
        console.log(result)
        if(result.ret)
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
       store.remove('token')
        location.reload()
    }
}

export default new index()