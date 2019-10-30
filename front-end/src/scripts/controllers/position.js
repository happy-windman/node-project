import httpModel from '../models/http'
import positionListView from '../views/positionList.art'
import addListView from '../views/addList.art'
import updateListView from '../views/updateList.art'

export const list=async (req,res,next)=>{
    let result=await httpModel.get({
        url:'api/position/'
    })
    if(result.ret)
    res.render(positionListView({list:result.data.list}))
    else {
        res.go('/home')
    }
  
    new List(res)
}

class List {
    constructor (res){
     
        this.render(res)
    }
    async render(res){
      
        $('#add-data').on('click',function(){
            $('#layui-layer1').css('display','block').html(addListView())   
        })
        $('#layui-layer1').on('click','#addSubmit',this.handleAdd.bind(this,'/api/position/')) 

        $('.update-btn').on('click',this.handleUpdate)
        $('.delete-btn').on('click',this.handleDelete)
        $('#search-btn').on('click',this.handSearch.bind(this,res))
     
        }
        async handleAdd(url){
            let data=$('#add-form').serialize()

            let result=await httpModel.update({
                url,
                type:'POST',
                data,
            })
            $('#add-form').get(0).reset();
            if(result.ret){
                alert(result.data.message)
               location.hash='/position/list?r'+'='+new Date().getTime()
            } else {
                alert(result.data.message)
            }
        }
    
        async handleUpdate(){
            let id=$(this).attr('data-id')
            let currentData = await httpModel.update({
                url:'/api/position/findOne',
                type:'get',
                data:{id}, 
            })
            
            $('#layui-layer1').css('display','block').html(updateListView({data:currentData.data}))  
            
            $('#layui-layer1').on('click','#updateSubmit',async function(){
                let data=$('#update-form').serialize()
                let result = await httpModel.update({
                    url:'/api/position/',
                    type:'PATCH',
                    data:data + '&id=' + id,  
                })
           
                if(result.ret){
                    alert(result.data.message)
                   location.hash='/position/list?r'+'='+new Date().getTime()
                } else {
                    alert(result.data.message)
                }
            })  
        }


        async handleDelete(){
            let id=$(this).attr('data-id')
            let result = await httpModel.update({
                url:'/api/position/',
                type:'DELETE',
                data:{id},  
            })
            if(result.ret){
                alert(result.data.message)
               location.hash='/position/list?r'+'='+new Date().getTime()
            } else {
                alert(result.data.message)
            }
        }

        async handSearch(res){
          
            let keyword=$('#search').val()
            let result = await httpModel.update({
                url:'/api/position/position_search',
                type:'post',
                data:{keyword}, 
            })
            console.log(result)
            if(result.ret){
                res.render(positionListView({list:result.data}))
                this.render(res)
            } else {
                alert(result.data.message)
            }
        }

        
}