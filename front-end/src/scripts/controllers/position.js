import httpModel from '../models/http'
import positionListView from '../views/positionList.art'
import addListView from '../views/addList.art'
import updateListView from '../views/updateList.art'
import store from 'store'
import _ from 'lodash'
const timeago = require('timeago.js')



export const list = async (req, res, next) => {
    
    let count = 3
    let currentPage = req.params.page || 1
    res.go('/position/list_'+currentPage)
    let result = await httpModel.get({
        url: 'api/position/',
        data:{
            start:count*(currentPage-1),
            count:count,
            
        }
    })

    if(result.data.list===0&&currentPage>1)
    {
        res.go('/position/list_'+(currentPage+1))
    }

    for (let i = 0; i < result.data.list.length; i++) {
        result.data.list[i].currentTime = timeago.format(result.data.list[i].currentTime, 'zh_CN')
    }
    if (result.ret) {
        let { list, total } = result.data
        let pageCount= _.range(1,Math.ceil(total / count)+1)
        req.pageCount = pageCount
        res.render(positionListView({
            list: list,
            pageCount,
            currentPage
        }))
    }
    else {
        res.go('/home')
    }
    new List(req,res,next)
}

class List {
    constructor(req,res,next) {
        this.render(req,res,next)
     
    }

    async render(req,res,next) {
        let  that=this
        $('#add-data').on('click', function () {
            $('#layui-layer1').css('display', 'block').html(addListView())
        })
        $('body').on('click','#back-btn',function(){
            console.log(1)
            $('#layui-layer1').css('display', 'none').html('')
        })
        $('#layui-layer1').on('click', '#addSubmit', this.handleAdd.bind(this, '/api/position/'))

        $('.update-btn').on('click', this.handleUpdate)
        $('.delete-btn').on('click', function(){
            that.handleDelete(req,res,next,this)
        })
        $('#search-btn').on('click', this.handSearch.bind(this, res))
        $('.num').on('click',function(){      
            that.handlePageNumberClick(req,res,next,this)
        })
       $('.prev').on('click',function(){      
        that.handlePageNumberClick(req,res,next,this,'prev')
        })
       $('.next').on('click',function(){      
        that.handlePageNumberClick(req,res,next,this,'next')
        })
    }

    async handleAdd(req,res,next) {
        let token = store.get('token')
        let options = {
            enctype: "multipart/form-data",
            url: '/api/position',
            type: 'POST',
            dataType: 'json',
            // async: false,
            headers: { 'X-Access-Token': token }, //添加请求头部
            success: (result, textStatus, jqXHR) => {
                if (result.ret) {
                    alert(result.data.message)
                    location.hash = '/position/list?r' + '=' + new Date().getTime()
                } else {
                    alert(result.data.message)
                }
            },
        }
        $('#add-form').ajaxForm(options)
    


    }

    async handleUpdate() {
        let id = $(this).attr('data-id')
        let currentData = await httpModel.update({
            url: '/api/position/findOne',
            type: 'get',
            data: { id },
        })

        $('#layui-layer1').css('display', 'block').html(updateListView({ data: currentData.data }))
        let token = store.get('token')
        let options = {
            enctype: "multipart/form-data",
            url: '/api/position',
            type: 'patch',
            dataType: 'json',
            // async: false,
            headers: { 'X-Access-Token': token }, //添加请求头部
            success: (result, textStatus, jqXHR) => {
                if (result.ret) {
                    alert(result.data.message)
                    location.hash = '/position/list?r' + '=' + new Date().getTime()
                } else {
                    alert(result.data.message)
                }
            },
        }
        $('#update-form').ajaxForm(options)
        $('body').on('click','#back-btn',function(){
            console.log(1)
            $('#layui-layer1').css('display', 'none').html('')
        })

    }


    async handleDelete(req,res,next,obj) {
        let id = $(obj).attr('data-id')
        let companyLogo = $(obj).attr('data-companyLogo')
        let result = await httpModel.update({
            url: '/api/position/',
            type: 'DELETE',
            data: { id,companyLogo},
        })
        if (result.ret) {
            console.log(req.params.page)
            alert(result.data.message)
            location.hash = '/position/list_'+req.params.page+'?r' + '=' + new Date().getTime()
        } else {
            alert(result.data.message)
        }
    }

    async handSearch(res) {

        let keyword = $('#search').val()
        let result = await httpModel.update({
            url: '/api/position/position_search',
            type: 'post',
            data: { keyword },
        })
        console.log(result)
        if (result.ret) {
         
            res.render(positionListView({ list: result.data }))
            this.render(res)
        } else {
            alert(result.data.message)
        }
    }

    async handlePageNumberClick(req,res,next,obj,type){
        if(type){
            let page = ~~req.params.page
            if(type=='prev'&&page>1)
           {
            res.go('/position/list_'+(page-1))
           } else if (type=='next'&&page<req.pageCount.length)
           {
            res.go('/position/list_'+(page+1))
           }
            
        }
        else res.go('/position/list_'+~~$(obj).text())
    }


}