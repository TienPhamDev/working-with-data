getData()
async function getData(){
  const response = await fetch("/api")
  const data = await response.json()
  
  data.forEach(e =>{
    const root = document.createElement("p")
    const vegetable = document.createElement("div")
    const geo = document.createElement("div")
    const date = document.createElement("div")
    const dateString = new Date(e.timestamp).toLocaleString()
    const image = document.createElement("img")
    
    image.src = e.image64
    
    vegetable.textContent = `vegetable : ${e.vegetable}`
    geo.textContent = `${e.lat} , ${e.lon}`
    date.textContent = dateString

    root.append(vegetable,geo,date,image)
    document.body.append(root)
  })

}