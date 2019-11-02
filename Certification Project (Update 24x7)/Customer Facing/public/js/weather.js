/* Does your browser support geolocation? */
function getLocation() {
    if (document.getElementById("allowLocationForWeather").checked === true){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const data = { lat, lon };
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    };
                    fetch('/api/v1/weather',options)
                    .then(response => response.json())
                    .then(results => {
                        document.getElementById("locationPermission").style.display = "none"
                        document.getElementById("weather").innerText = results.weatherData.weather;
                        document.getElementById("weatherIcon").src = results.weatherData.iconUrl;
                        document.getElementById("temperature").innerText = results.weatherData.temperature;
                        document.getElementById("weatherCity").innerText = results.weatherData.city;
                    })
                    .catch(err => console.log(err));
                },
                (positionError) =>{
                    console.log(positionError);
                },
                {enableHighAccuracy:true}
            );
        } else { 
            // Geolocation is not supported by this browser
            // TODO display random rotating weather or hide weather until box is checked
        }
    } else {
        // User did not check box to allow browser to use location
        // TODO display random rotating weather or hide weather until box is checked
    }
}