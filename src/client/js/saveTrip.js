function saveTrip() {
    // get trip details that belong to the button
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value

    // get trips from localStorage if there are any, declare empty array if none
    let local_storage_trips_json = window.localStorage.getItem('trips');

    let trips = getTrips(local_storage_trips_json);
    
    // build trip object and add to previous trips / or to empty array
    let trip = {
        'city': city,
        'start_date': start_date,
        'end_date': end_date,
    }
    trips.push(trip);

    // display saved entry on front-end
    trips.innerText = trips;

    // save to localStorage
    window.localStorage.setItem('trips', JSON.stringify(trips));
    
}

function getTrips(trips){
    if(trips === null) {
        return [];
    } else {
        return JSON.parse(trips);
    }
}

export { saveTrip }