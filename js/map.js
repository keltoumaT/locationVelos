class Map{
    constructor(){
        this.APIlink = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f0392bfdffc0a10a8378cd64c75e5a7a975054d8";
        this.markers =[];
        this.markerClusters = new L.MarkerClusterGroup();
        this.stationName = document.getElementById("reserved_station");
        this.missingLastName = document.getElementById("missingLastName");
        this.missingFirstName = document.getElementById("missingFirstName");
        this.mapTile = null;
        this.ajax = null;
        this.pannel = document.getElementById("pannel");
        this.av_bikes = document.getElementById("availableBikes_span");
        this.av_bikes_spot = document.getElementById("availableSpots_span");
        this.station_adress = document.getElementById("adress_span");
        this.station_state = document.getElementById("status");
        this.station_name = document.getElementById("stationName");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.unavailableStation = document.getElementById("unavailable_station");
        this.signToBookBtn = document.getElementById("btn_sign_to_book");
        this.iconFull = L.icon({
            iconUrl:"ASSETS/iconFull.svg",
            iconSize: [40,40],
            iconAnchor:[22,50],
            className: "markerActive"
        });
        this.iconClosed = L.icon({
            iconUrl:"ASSETS/closed.svg",
            iconSize:[40,40],
            iconAnchor:[22,50]
        });
    }

    initMap(){
        this.mapTile = L.map("map").setView([45.750000, 4.850000],13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18
        }).addTo(this.mapTile);
        this.displayMarkers();
    }


   
    displayMarkers() {
    
     
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=f0392bfdffc0a10a8378cd64c75e5a7a975054d8",(response)=>{
            let stations = JSON.parse(response);
            stations.forEach((station) => {
               
                if (station.status === "OPEN" && station.available_bikes !== 0) {
                    let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconFull);
                    
                
                    this.markers.push(marker);  
                  
                    this.markerClusters.addLayer(marker);
                    marker.addEventListener("click", function(){
                        this.av_bikes.textContent = station.available_bikes;
                        this.av_bikes_spot.textContent =station.available_bike_stands;
                        this.station_adress.textContent = station.address;
                        this.station_state.textContent = station.status;
                        this.station_name.textContent = station.name;
                        this.unavailableStation.style.display = "none";
                        this.firstName.removeAttribute("disabled","");
                        this.lastName.removeAttribute("disabled","");
                        this.signToBookBtn.style.visibility = "visible";
                        this.pannel.style.display = "block";
                        this.pannel.classList.add("pannel_animation");
                    }.bind(this));
                } else {
                    let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconClosed);
                    marker.addEventListener("click", function(){
                      
                        this.av_bikes.textContent = station.available_bikes;
                        this.av_bikes_spot.textContent =station.available_bike_stands;
                        this.station_adress.textContent = station.address;
                        this.station_state.textContent = station.status;
                        this.firstName.setAttribute("disabled","");
                        this.lastName.setAttribute("disabled","");
                        this.unavailableStation.style.display = "block";
                        this.signToBookBtn.style.visibility = "hidden";
                        this.pannel.style.display = "block";
                        this.pannel.classList.add("pannel_animation");
                        this.missingFirstName.style.displya = "none";
                        this.missingLastName.style.displya = "none";


                    }.bind(this));
                    this.markers.push(marker);
                    this.markerClusters.addLayer(marker);
                    
                }
    
                })
               this.mapTile.addLayer(this.markerClusters);
            
        });
    
    }




		

}


let myMap = new Map;

myMap.initMap();





