import { Request, Response } from "express"
import Product from "../models/Product.model"

export const createProduct = async (req : Request, res : Response) => {


   try{
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
   } catch(error){
        
   }

   

}

export const getProducts = async(req : Request, res : Response) => {

    try{
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
            // limit: 2
        })
        res.json({data: products})
    } catch(error){
        console.log(error)
    }

}


export const getProductById = async(req : Request, res : Response) => {

    try{
        const {id } = req.params
        const product = await Product.findByPk(id)

        if(!product){
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }
        res.json({data: product})
    } catch(error){
        console.log(error)
    }

}



export const getUpdateProduct = async(req : Request, res : Response) => {

    const {id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    //actualizar
    // product.name = req.body.name esto sirve pero puede ser muy contraproducente por que si no se pasan todos los datos el json que devuelve no estara completo, eso si es más estricto
    //put reemplaa todo el objeto aunque se envie solo una parte

    await product.update(req.body) //update es mejor opcion por que puede ser parcial
    product.save()

    res.json({data: product})
}


export const updateAvailability = async(req : Request, res : Response) => {
    const {id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    //patch reemplaza unicamente lo que se esta enviando por lo cual se puede usar lo siguiente:
    product.availability = !product.dataValues.availability
    await product.save()
    
    
    res.json({data: product})
}

export const deleteProduct = async(req : Request, res : Response) => {
    const {id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}