// allows to use environment variables
const dotenv = require('dotenv');
dotenv.config();

// Dependencies
const cors = require('cors')
const port = 8000;
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get("/", (req, res) => res.sendFile("index.html"));

app.post("/api", async (req, res) => {

    // geo stuff
    const city = req.body.city;
    const date = req.body.date;
    const geolocation = await fetch(`http://api.geonames.org/search?name=${city}&username=${process.env.username}&type=json`);
    const geo_json = await geolocation.json(); // returned as object
    const first_result = geo_json.geonames[0];
    const latitude = first_result.lat
    const longitude = first_result.lng

    // weather stuff
    const weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${latitude}&lon=${longitude}`
    const weather = await fetch(weather_url);
    const weather_json = await weather.json();
    const forecast = getForecastForDay(date, weather_json.data)
    const description = getForecastDescription(forecast)

    // picture stuff
    const image_url = `https://pixabay.com/api?key=${process.env.PIXABAY_KEY}&q=${city}`
    const image = await fetch(image_url);
    const image_json = await image.json();
    const image_web_url = image_json.hits[0].webformatURL;

    res.send({ temp: forecast ? forecast.temp : null, description, image_web_url });
});

function getForecastDescription(forecast) {
    if(forecast && forecast.weather) {
        return forecast.weather.description;
    }
    return "";
}

function getForecastForDay(date, forecasts) {
    const filtered = forecasts.filter(forecast => forecast.valid_date === date)
    if(filtered.length === 0) {
        return null;
    }
    return filtered[0]
}

app.listen(port, () => console.log(`Example app listening on port ${ port }!`));