var inputValue = document.querySelector('#search_place');

document.getElementById('submit').addEventListener('click', doSubmit);

function doSubmit(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid=5c736e1c517fefd7f4d5222fa9808a5e')
    .then((res) => {
        if (!res.ok) {
            throw new Error('The provided place wasnot found. Try something else.');
        }
        return res.json();
    })
    .then((data) => {
        var cityName = data['name'];
        var tempValue = data['main']['temp'];
        var cnValue = data['sys']['country'];
        var weatherDetail = data.weather[0].description;
        function weatherRes(weatherDetail){
            return weatherDetail.charAt(0).toUpperCase()+weatherDetail.slice(1);
        }

        document.getElementById('api_place').innerHTML = cityName;
        document.getElementById('api_temp').innerHTML = Math.round(tempValue);
        document.getElementById('weather-main').innerHTML = weatherRes(weatherDetail);
    
    })
    .catch((err) => {
        document.getElementById('api_error').innerHTML = err;
    })

}