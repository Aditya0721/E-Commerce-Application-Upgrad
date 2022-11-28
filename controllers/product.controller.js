const productModel = require("../models/product.model")

exports.fetchProducts = async(req, res)=>{
    
    try{
        let dir = {DESC:-1, ASC:1}
        let category = {$regex: '^[a-zA-Z]*'}
        let direction = dir["DESC"]
        let key = "productId"
        let pageNo = 0
        let pageSize = 0

        if(req.query.category){
            category = req.query.category
        }

        if(req.query.direction){
            direction = dir[req.query.direction]
        }

        if(req.query.pageNo){
        pageNo = req.query.pageNo 
        }

        if(req.query.pageSize){
            pageSize = req.query.pageSize 
        }
        
        if(req.query.sortBy){
            key = req.query.sortBy
        }
        let result = ""
        if(req.query.name){
            result = await productModel.find({name:req.query.name})
        }

        else{
            const sortBy = {[key]: direction}
            console.log(sortBy)
            result = await productModel.find({category:category}).sort(sortBy).skip(pageNo*pageSize).limit(pageSize) 
        }

        return res.status(200).json({
            data: result
        })
    }
    catch(err){
        return res.status(500).json({
            error: "Internal Error"
        })
    }
}

exports.fetchCategories = async(req, res)=>{

    try{
        const result = await productModel.find({},{_id:0, category:1})
        const responseObject = []
        result.forEach((doc)=>{
            responseObject.push(doc.category)
        })

        return res.status(200).json(responseObject)
    } 
    catch(err){
        return res.status(500).json({
            error: "Internal Error"
        })
    }

}