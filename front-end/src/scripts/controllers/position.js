import httpModels from '../models/http'
import positionListView from '../views/positionList.art'

export const list=(req,res,next)=>{
    httpModels.get({
        url:'api/position/findAll'
    })
    res.render(positionListView())
}