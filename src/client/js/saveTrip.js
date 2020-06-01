function saveTrip() {
    // get trip details that belong to the button
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value

    // build array of trips
    let trips = [];
    let trip = {
        'city': city,
        'start_date': start_date,
        'end_date': end_date,
    }
    trips.push(trip);

    // save to localStorage
    window.localStorage.setItem('trips', JSON.stringify(trips));

    // display saved entry on front-end
    let saved_trips = document.getElementById('saved_trips');
    let localStorage_trips = window.localStorage.getItem('trips');
    console.log(localStorage_trips);
    // saved_trip.innerText = localStorage_trips;
}

export { saveTrip }