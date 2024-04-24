const express = require('express')
const app = express()
app.listen(3000, () => {
  console.log('listening 3000')
})

const dataBase = []
app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))


app.post("/api", (request, response) => {
  console.log("i got a request")
  console.log(request.body)
  const data = request.body
  dataBase.push(data)
  response.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
    dataB: {dataBase}
   })
})