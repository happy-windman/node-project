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
const search = async ({start,count,keyword}) => {
   
    let reg = new RegExp(keyword,'gi')
   
            let list = await Positions.find({}).or([{ companyName: reg }, { positionName: reg }]).limit(~~count).skip(~~start).sort({_id: -1})
            let total =  await Positions.find({}).or([{ companyName: reg }, { positionName: reg }]).count()
            return {
                list,
                total
            }
}
module.exports={
    findOne,
    save,
    findAll,
    update,
    remove,
    search
}