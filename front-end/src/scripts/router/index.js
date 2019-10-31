

import SMERouter from 'sme-router'
import {index} from '../controllers/index'
import {login} from '../controllers/login'
import {register} from '../controllers/register'
import {findPassword} from '../controllers/findpassword'

import {home} from '../controllers/home'
import * as position from '../controllers/position'
import titleView from '../views/title.art'

const router=new SMERouter('content')

router.use((req)=>{
let url = req.url.substr(1).split('?')[0].split('_')[0]
console.log(url,111)

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

//面包屑
let BreadcrumbMap = {
    'home': {
      level1: '主页',
      level2: 'home'
    },
    'position/list': {
      level1: '数据管理',
      level2: '数据列表'
    },
    'login':{
      level1: '会员管理',
      level2: '登录'
    },
    'register':{
        level1: '会员管理',
        level2: '注册'
      },
      'findpassword':{
        level1: '会员管理',
        level2: '找回密码'
      }
  }

  let info = {
    Breadcrumb: {
      level1: BreadcrumbMap[url].level1,
      level2: BreadcrumbMap[url].level2
    },
  }

  let html = titleView({
    breadcrumb: info.Breadcrumb
  })
  $('.layui-tab-title').html(html)


})



router.route('/login',login)
router.route('/register',register)
router.route('/findpassword',findPassword)
router.route('/home',home)
router.route('/position/list',position.list)
router.route('/position/list_:page',position.list)

// router.route('*',(req,res,next)=>{
//     res.redirect('/login');
// })

export {router}
