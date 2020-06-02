// get saved trips from localStorage
function loadTrips() {

    let local_storage_trips_json = window.localStorage.getItem('trips');
    let trips = local_storage_trips_json === null ? [] : JSON.parse(local_storage_trips_json);
    return trips;
}

// display saved trips on front end
function displayTrips(trips) {
    
    let saved_trips = document.getElementById('saved_trips');
    
    if(trips.length > 0) {
        let title = document.createElement("h1");
        title.innerText = "Saved trips";
        title.style.textTransform = "uppercase";
        saved_trips.appendChild(title);
        saved_trips.style.border = "2px solid black";

        for(const trip of trips) {
            let p = document.createElement("p");
            p.innerText = trip.city + ", date: " + trip.start_date;
            saved_trips.appendChild(p);
        }
    }
}

// save trip to localStorage
function saveTrip() {
    let trips = loadTrips();

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

export { loadTrips, saveTrip, displayTrips }