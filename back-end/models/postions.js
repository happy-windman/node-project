const {Positions} = require('../utils/db')

const save=(data)=>{
    const positions=new Positions(data)
    return positions.save()
}

const findAll = async ({start,count}) =>{
    let list =  await Positions.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
    let total =  await Positions.find({}).count()
    return {
        list,
        total
    }
}

const findOne = async (id) =>{
    return await Positions.findById(id)
}

const update= async (data) =>{
    return await Positions.findByIdAndUpdate(data.id,data)
}

const remove = async (id) =>{
    return await Positions.findByIdAndDelete(id)
}
const search = async (keyword) => {
    let reg = new RegExp(keyword,'gi')
    return await Positions.find({}).or([{ companyName: reg }, { positionName: reg }])
}
module.exports={
    findOne,
    save,
    findAll,
    update,
    remove,
    search
}