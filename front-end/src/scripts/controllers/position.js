import httpModel from '../models/http'
import positionListView from '../views/positionList.art'
import addListView from '../views/addList.art'
import updateListView from '../views/updateList.art'
import store from 'store'
import _ from 'lodash'
const timeago = require('timeago.js')



export const list = async (req, res, next) => {
    new List(req, res, next)

}

class List {
    constructor(req, res, next) {
        this.render(req, res, next, 'api/position/', 'GET', '')


    }
    async render(req, res, next, url, type, keyword) {
        let a = req.url.split('?')[0]
        this.listRouter = a.substring(0, a.length - req.params.page.length)
        console.log(this.listRouter, req.url.split('?')[0])
        let count = 3
        let currentPage = req.params.page || 1
        res.go(this.listRouter + currentPage)
        keyword = $('#root').attr('data-keyword')
        if (this.listRouter == '/position/list_') { 
            keyword = ''
         }
        if ($('#root').attr('data-type') && $('#root').attr('data-api')) {
            type = $('#root').attr('data-type')
            url = $('#root').attr('data-api')
        }

        let result = await httpModel.get({
            url: url,
            type,
            data: {
                start: count * (currentPage - 1),
                count: count,
                keyword
            }
        })

        if (result.data.list === 0 && currentPage > 1) {
            res.go(this.listRouter + (currentPage + 1))
        }

        for (let i = 0; i < result.data.list.length; i++) {
            result.data.list[i].currentTime = timeago.format(result.data.list[i].currentTime, 'zh_CN')
        }

        if (result.ret) {
            let { list, total } = result.data
            let pageCount = _.range(1, Math.ceil(total / count) + 1)
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

        this.init(req, res, next)
    }

    async init(req, res, next) {
        let that = this
        $('#add-data').on('click', function () {
            $('#layui-layer1').css('display', 'block').html(addListView())
        })
        $('body').on('click', '#back-btn', function () {

            $('#layui-layer1').css('display', 'none').html('')
        })
        $('#layui-layer1').on('click', '#addSubmit', this.handleAdd.bind(this, '/api/position/'))

        $('.update-btn').on('click', function () {
            that.handleUpdate(req, res, next, this)
        })
        $('.delete-btn').on('click', function () {
            that.handleDelete(req, res, next, this)
        })
        $('#search-btn').on('click', this.handSearch.bind(this, req, res, next))
        // $('.num').on('click', function () {
        //     that.handlePageNumberClick(req, res, next, this)
        // })
        // $('.prev').on('click', function () {
        //     that.handlePageNumberClick(req, res, next, this, 'prev')
        // })
        // $('.next').on('click', function () {
        //     that.handlePageNumberClick(req, res, next, this, 'next')
        // })
        $.fn.zPager.defaults = {
    
            pageCount: 6, //总页数
            current: 1, //当前页码数
            pageStep: 8, //当前可见最多页码个数
            minPage: 5, //最小页码数，页码小于此数值则不显示上下分页按钮
            active: 'current', //当前页码样式
            prevBtn: 'pg-prev', //上一页按钮
            nextBtn: 'pg-next', //下一页按钮
            btnBool: true, //是否显示上一页下一页
            firstBtn: 'pg-first', //第一页按钮
            lastBtn: 'pg-last', //最后一页按钮
            btnShow: true, //是否显示第一页和最后一页按钮
            disabled: true, //按钮失效样式
        
        }
        $("#z-pager").zPager({
            pageCount: 6, //总页数
            current: 3, //当前页码数
            pageStep: 8, //当前可见最多页码个数
            minPage: 5, 
        
            btnShow: true,
           
            dataRender: function(data) {
                console.log(data );
            },
        });
    }

    async init_search() {
        $('#root').attr('data-type', '')
        $('#root').attr('data-api', '')
    }

    async handleAdd(req, res, next) {
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
                    $('#root').attr('data-keyword', '')
                    location.hash = '/position/list_1?r' + '=' + new Date().getTime()
                } else {
                    alert(result.data.message)
                }
            },
        }
        $('#add-form').ajaxForm(options)



    }

    async handleUpdate(req, res, next, obj) {
        let id = $(obj).attr('data-id')
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

                    location.hash = req.url.split('?')[0] + '?r' + '=' + new Date().getTime()

                } else {
                    alert(result.data.message)
                }
            },
        }
        $('#update-form').ajaxForm(options)
        $('body').on('click', '#back-btn', function () {

            $('#layui-layer1').css('display', 'none').html('')
        })

    }


    async handleDelete(req, res, next, obj) {
        let id = $(obj).attr('data-id')
        let companyLogo = $(obj).attr('data-companyLogo')
        let result = await httpModel.update({
            url: '/api/position/',
            type: 'DELETE',
            data: { id, companyLogo },
        })
        if (result.ret) {

            alert(result.data.message)

            location.hash = req.url.split('?')[0] + '?r' + '=' + new Date().getTime()
        } else {
            alert(result.data.message)
        }
    }

    async handSearch(req, res, next) {
        // this.listRouter='/position/list_search_'

        console.log(req.url)
        let keyword = $('#search').val()
        $('#root').attr('data-keyword', keyword)
        $('#root').attr('data-api', '/api/position/position_search')
        $('#root').attr('data-type', 'post')
        this.render(req, res, next, '/api/position/position_search', 'post', keyword)
        res.go('/position-search/list_1')
        // let result = await httpModel.update({
        //     url: '/api/position/position_search',
        //     type: 'post',
        //     data: { keyword },
        // })
        // console.log(result)
        // if (result.ret) {

        //     res.render(positionListView({ list: result.data }))
        //     this.init(res)
        // } else {
        //     alert(result.data.message)
        // }
    }

    async handlePageNumberClick(req, res, next, obj, type) {
console.log(req.params.page,22222)
        if (type) {
            let page = ~~req.params.page
            
            if (type == 'prev' && page > 1) {
                res.go(this.listRouter + (page - 1))
            } else if (type == 'next' && page < req.pageCount.length) {
                res.go(this.listRouter + (page + 1))
            }

        }
        else res.go(this.listRouter + ~~$(obj).text())
    }



}