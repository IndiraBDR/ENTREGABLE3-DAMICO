import express from "express";
import { ProductManager } from "./productManager.js";


const app = express()

const productManager = new ProductManager(); //instancia de la class

/*
app.get('/api/products', async (req,res)=>{

    let limit =  Number(req.query.limit)  ;
    let products= await productManager.getProduct();

    if(limit){

        let productsLimitados=  products.slice(0,limit)
     
        res.json(productsLimitados)
    }else{


        res.json(products)
    };

  

})

app.get('/api/products/:id', async (req,res)=>{

   const {id} = req.params ;
  
  let productoFiltrado= await productManager.getProductById(+id);
  
  res.json(productoFiltrado)

})

*/

app.get("/api/products", async (req, res) => {
    //let limit =  Number(req.query.limit)  ;
    const { limit } = req.query;
  
    try {
      let products = await productManager.getProduct();
  
      if (limit) {
        let productsLimitados = products.slice(0, +limit);
  
        res.status(200).json({ message: "product found", productsLimitados });
      } else {
        res.status(200).json({ message: "product total", products });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      let productoFiltrado = await productManager.getProductById(+id);
  
      if (!productoFiltrado) {
        res.status(404).json({ message: "product not found" });
      } else {
        res.status(200).json({ message: "product found", productoFiltrado });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



app.listen(8080,()=>{

   


})