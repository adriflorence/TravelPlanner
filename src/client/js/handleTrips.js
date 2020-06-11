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

        for(let i = 0; i < trips.length; i++) {
            let trip = trips[i];
            let index = i + 1;

            // remove button
            let button = document.createElement("button");
            button.innerText = "X";
            button.style.background = 'none';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            let id = "trip_" + index; // dynamically create id for each paragraph and pass it in to removeTrip function
            button.addEventListener("click", function(){ Client.removeTrip(id) });

            // each trip
            let p = document.createElement("p");
            p.innerText = trip.start_date + ": " + trip.city;
            p.id = id;
            p.appendChild(button);

            saved_trips.appendChild(p);
        }
    }
}

// save trip to localStorage
function saveTrip() {
    let trips = loadTrips();
    let index = trips.length + 1;

    // get trip details out of HTML elements
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value
    
    // build trip object and add to previous trips / to empty array
    let trip = {
        'id': "trip_" + index,
        'city': city,
        'start_date': start_date,
        'end_date': end_date,
    }
    trips.push(trip);

    // save to localStorage
    window.localStorage.setItem('trips', JSON.stringify(trips));
}

function removeTrip(trip_id) {
    // remove from front end
    let trip = document.getElementById(trip_id);
    if(trip) trip.remove();

    // remove from localStorage
    let trips = loadTrips();
    let remaining_trips = trips.filter(trip => trip.id !== trip_id)

    window.localStorage.setItem('trips', JSON.stringify(remaining_trips));
}

export { loadTrips, displayTrips, saveTrip, removeTrip }