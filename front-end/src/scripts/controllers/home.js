import homeView from '../views/home.art'


export const home = (req,res,next)=>{
    console.log(111)
    res.render(homeView())

    
}