

import SMERouter from 'sme-router'
import {index} from '../controllers/index'
import {login} from '../controllers/login'
import {register} from '../controllers/register'
import {home} from '../controllers/home'
import * as position from '../controllers/position'

const router=new SMERouter('content')

router.use((req)=>{
let url = req.url.substr(1)
console.log(url,111)
console.log($(`#nav a`).length)
for(let i=0;i<$(`#nav a`).length;i++)
{
    if($(`#nav a`).eq(i).attr('data-url')==url)
    {   
        $(`#nav a`).removeClass('active')
        $(`#nav a`).eq(i).addClass('active')
        $(`.sub-menu`).css('display','none')
        $(`#nav a`).eq(i).parent().parent().css('display','block')
    }
}

})
router.route('/login',login)
router.route('/register',register)
router.route('/home',home)
router.route('/position/list',position.list)
// router.route('*',(req,res,next)=>{
//     res.redirect('/login');
// })

export {router}
