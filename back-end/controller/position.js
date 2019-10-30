const positionsModel = require('../models/postions')
const moment = require('moment')
const findOne = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let id = req.query.id
    let result = await positionsModel.findOne(id)
    console.log(result)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(result)
        })
    }
}

const findAll = async (req, res, next) => {

    res.set('Content-Type', 'application/json; charset=utf-8')
    let list = await positionsModel.findAll()

    if (list) {
        res.render('succ', {
            data: JSON.stringify({ list })
        })
    } else {
        res.render('succ', {
            data: JSON.stringify({ list: [] })
        })
    }

}

const position_add = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(data)
    // let { positionName, companyName, city, experience, education, salary, currentTime } = req.body
    let result = await positionsModel.save(data)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({ message: '添加成功！' })
        })
    }
    else {
        res.render('fail', {
            data: JSON.stringify({ message: '添加失败！' })
        })
    }
}

const position_update = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
  
    let result = await positionsModel.update(data)

    if (result) {
        res.render('succ', {
            data: JSON.stringify({ message: '修改成功！' })
        })
    }
    else {
        res.render('fail', {
            data: JSON.stringify({ message: '修改失败！' })
        })
    }
}

const position_delete = async (req, res, next) => {
    let id = req.body.id
    let result = await positionsModel.remove(id)
    console.log(id)
    if (result) {
        res.render('succ', {
            data: JSON.stringify({ message: '删除成功！' })
        })
    }
    else {
        res.render('fail', {
            data: JSON.stringify({ message: '删除失败！' })
        })
    }
}

const position_search = async (req,res,next) =>{
    let {keyword} = req.body
    let result = await positionsModel.search(keyword)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result)
        })
    }
    else {
        res.render('fail', {
            data: JSON.stringify({ message: '查询失败！' })
        })
    }
}
module.exports = {
    findOne,
    findAll,
    position_search,
    position_add,
    position_update,
    position_delete

}