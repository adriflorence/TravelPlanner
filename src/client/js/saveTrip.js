function saveTrip() {
    // get trip details that belong to the button
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value

    // save them to localStorage
    window.localStorage.setItem('city', city);
    window.localStorage.setItem('start_date', start_date);
    window.localStorage.setItem('end_date', end_date);

    // display saved entry on front-end
    let saved_trip = document.getElementById('saved_trips');
    let ls_city = window.localStorage.getItem('city');
    saved_trip.innerText = ls_city;
}

export { saveTrip }