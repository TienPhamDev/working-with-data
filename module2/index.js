const express = require('express')
const Datastore = require("nedb")
const app = express()
app.listen(3000, () => {
  console.log('listening 3000')
})

const dataBase = new Datastore("database.db")
dataBase.loadDatabase();

app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))

app.get("/api", (request, response) => {
  dataBase.find({}, (err, data) => {
    

    response.json(data)
    
  })
})

app.post("/api", (request, response) => {
  console.log("i got a request")
  console.log(request.body)
  const data = request.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  dataBase.insert(data)
  response.json({
    status: "success",
    timestamp: data.timestamp,
    latitude: data.lat,
    longitude: data.lon,
   })
})