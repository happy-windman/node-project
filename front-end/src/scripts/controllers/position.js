import httpModels from '../models/http'
import positionListView from '../views/positionList.art'

export const list=async (req,res,next)=>{
    let result=await httpModels.get({
        url:'api/position/findAll'
    })
    if(result.ret)
    res.render(positionListView())
    else {
        res.go('/home')
    }
}