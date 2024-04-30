function setup(){
  noCanvas()
  //const video = createCapture(VIDEO)
  //video.size(320,240)
  
  const input = document.querySelector(".vegetable")
  const submitBtn = document.querySelector(".btn-toServer")
  const locationBtn = document.querySelector(".btn-location")
  const locationDiv = document.querySelector(".location")
  const map = L.map('map').setView([0, 0], 13);
  const tile =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  const marker = L.marker([0, 0]).addTo(map);

  let lat,lon
  submitBtn.addEventListener("click",async (e)=>{
    const vegetable = input.value
    //video.loadPixels()
    //const image64 = video.canvas.toDataURL()
    const data = {lat,lon,vegetable}
    const options ={
      method :"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    }        
    const response = await fetch("/api",options)
    const json = await response.json()
    console.log(json)     
  })
    if("geolocation" in navigator){
      console.log("geolocation is available")
      navigator.geolocation.getCurrentPosition(async (position)=>{
        lat = position.coords.latitude
        lon = position.coords.longitude
        map.setView([lat,lon],2)
        marker.setLatLng([lat,lon]).addTo(map)
        
        document.getElementById("latitude").textContent = lat.toFixed(2)
        document.getElementById("longitude").textContent = lon.toFixed(2)
        
      })
    }
    else {
      console.log("geolocation is not available")
    }
  locationBtn.addEventListener("click",(e)=>{
    locationDiv.classList.toggle("hidden")
  })

}