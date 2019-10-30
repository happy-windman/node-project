const {Users}=require('../utils/db')

const save=(data)=>{
    const users=new Users(data)
    return users.save()
}

const findOne=(conditions)=>{
    return Users.findOne(conditions)
}

const update= async (conditions,data) =>{
    console.log(conditions,data)
    return await Users.findOneAndUpdate(conditions,data)
}

module.exports = {
    save,
    findOne,
    update
}

