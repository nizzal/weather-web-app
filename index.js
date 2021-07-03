const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const fetch = require('node-fetch');
const env = require('dotenv').config();
const apiKey = process.env.API;

app.use(express.static('public'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));


// API Endpoint
app.post('/api', async (req, res) => {
    let placeName = req.body.name;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${placeName}&appid=${apiKey}`;
    options = {
        'method': 'GET',
    };
    const fetchAPI =  await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err))
    
    res.json(fetchAPI)
    console.log(fetchAPI)
})


// Server Listening
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`))
