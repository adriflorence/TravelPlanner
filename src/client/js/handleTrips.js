function loadTrips() {

    // get saved trips from localStorage
    let local_storage_trips_json = window.localStorage.getItem('trips');
    let trips = local_storage_trips_json === null ? [] : JSON.parse(local_storage_trips_json);

    // display saved trips on front end
    let saved_trips = document.getElementById('saved_trips');
    
    for(const trip of trips) {
        let p = document.createElement("p");
        p.innerText = JSON.stringify(trip);
        saved_trips.appendChild(p);
    }
}

function saveTrip() {

    // get trip details out of HTML elements
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value
    
    // build trip object and add to previous trips / to empty array
    let trip = {
        'city': city,
        'start_date': start_date,
        'end_date': end_date,
    }
    trips.push(trip);

    // save to localStorage
    window.localStorage.setItem('trips', JSON.stringify(trips));
}

export { loadTrips, saveTrip }