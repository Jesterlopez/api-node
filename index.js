const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let products = [
  {
    id: 1,
    name: 'Pala',
    price: 45,
    description: 'lorem lorem lorem lorem'
  },
  {
    id: 2,
    name: 'Cierra',
    price: 80,
    description: 'lorem lorem lorem lorem'
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id)
  const product = products.find(product => product.id === id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id)
  products = products.filter(product => product.id !== id)
  res.status(204).end()
})

app.post('/api/products', (req, res) => {
  const product = req.body

  const ids = products.map(product => product.id)
  const maxId = Math.max(...ids)
  const newProduct = {
    id: maxId + 1,
    name: product.name,
    price: product.price,
    description: product.description
  }

  products = [...products, newProduct]

  res.json(newProduct)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`)
})
