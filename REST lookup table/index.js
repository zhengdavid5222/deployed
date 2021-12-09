const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3005
const cors = require('cors')



app.use(cors())

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/getMIULookup', db.getMIULookup)
app.post('/postCustomerLookup', db.postCustomerLookup)
app.post('/postProviderLookup', db.postProviderLookup)
app.post('/postProvision', db.postProvision)



