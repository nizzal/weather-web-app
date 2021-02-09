var inputValue = document.getElementById('search_place');
var form = document.getElementById('main-form');

form.addEventListener('submit', doSubmit);

function doSubmit(e) {
    e.preventDefault();
    err1 = new Error('The provided place wasnot found, try something else.');

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=metric&appid=5c736e1c517fefd7f4d5222fa9808a5e')
        .then((res) => {
            if (!res.ok) {
                document.getElementById('error-mssg').textContent = err1;
                document.getElementById('error-mssg').style.display = "block";
            }
            else {
                if (err1 === "" || err1 == null) {
                    return res.json();
                } else {
                    document.getElementById('error-mssg').style.display = "none";
                }
                return res.json();
            }
        })
        .then((data) => {
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


            document.getElementById('api_place').innerText = cityName;
            document.getElementById('api_temp').innerText = Math.round(tempValue);
            document.getElementById('weather-main').innerText = weatherRes(weatherDetail);

        })
}