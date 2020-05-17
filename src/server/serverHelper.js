function getForecastDescription(forecast) {
  if(forecast && forecast.weather) {
      return forecast.weather.description;
  }
  return "";
}

function getForecastForDay(start_date, forecasts) {
  const filtered = forecasts.filter(forecast => forecast.valid_date === start_date)
  if(filtered.length === 0) {
      return null;
  }
  return filtered[0]
}

module.exports = { getForecastDescription, getForecastForDay }