function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  
  async function  showPosition(position) {
    langlong=position.coords.latitude+","+position.coords.longitude;
    const response = await fetch('http://api.positionstack.com/v1/reverse?access_key=ef78cc2b92eccff8c19061e7118fcb30&query='+langlong);
    const data = await response.json()
    var i=0
    while (i < data["data"].length){
      var city=(data["data"][i]["region"])
      if (city===null){
        i++
      }
      else{
        break;
      }
    }
    
    document.getElementById("location-display-label").value =city;
  }