const serverHelper = require('./serverHelper.js')

test("If there is weather field in forecase, returns value", () => {
    const forecast = {
        weather: { 
            description: "luvly sunny day"
        }
    }

    expect(serverHelper.getForecastDescription(forecast)).toBe("luvly sunny day")
    expect(serverHelper.getForecastDescription(undefined)).toBe("")
});

test("Returns a given date's forecast", () => {
    const date = "2021-04-14"
    const forecasts = [
        {
            valid_date: "2020-05-17",
            weather: { 
                description: "rain and rain",
            }
        },
        {
            valid_date: "2021-04-14",
            weather: { 
                description: "luvly sunny day",
            }
        },
    ]

    expect(serverHelper.getForecastForDay(date, forecasts)).toBe(forecasts[1])
});