var inputValue = document.getElementById('search_place');
var form = document.getElementById('main-form');

form.addEventListener('submit', doSubmit);

async function doSubmit(e) {
    e.preventDefault()
    err1 = new Error('The provided place wasnot found, try something else.')

    options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputValue.value
        })
    }

    await fetch('/api', options)
        .then((res) =>{
            return res.json();
        })
        .then((data) => {
            if (data.cod == 200) {
                var cityName = data['name'];
                var tempValue = data['main']['temp'];
                var cnValue = data['sys']['country'];
                var weatherDetail = data.weather[0].description;
                function weatherRes(weatherDetail) {
                    return weatherDetail.charAt(0).toUpperCase() + weatherDetail.slice(1);
                }

                // Icon Image Display
                var iconcode = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                document.getElementById('main-icon').setAttribute("src", iconurl);
                document.getElementById('main-icon').style.height = "250px";


                document.getElementById('api_place').innerText = cityName + "," + cnValue;
                document.getElementById('api_temp').innerText = Math.round(tempValue);
                document.getElementById('weather-main').innerText = weatherRes(weatherDetail);
            } else {
                alert(data.message)
            }
        })
}

