import express from 'express'
import {ProductManager} from './ProductManager.js'

const productManager = new ProductManager({path:'Desafio4/db/products.json'})

const app = express()

// app.get('/products', async (req, res) => {
//     const limit = parseInt(String(req.query.limit))
//     if(!limit) return res.send(productManager.readProducts())
//     const products = await productManager.getProducts()
//     res.json(products.slice(0,limit))
// })
  
//   app.get('/products/:id', async (req, res) => {
//     const productId = parseInt(req.params['id'])
//     const foundProduct = await productManager.getElementById(productId)
//     if (foundProduct) {
//       res.json({ product: foundProduct })
//     } else {
//       res.json({ error: `no se encontró el producto con id ${productId}` })
//     }
//   })

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('static', express.static('./static'))

app.use('/', )

app.listen(8080, () => {
    console.log('conectado al puerto 8080')
})