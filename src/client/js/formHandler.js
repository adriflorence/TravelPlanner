function handleSubmit(event) {
    event.preventDefault();
    let url_prod = '/api';

    // pick out values from HTML inputs
    let city = document.getElementById('city').value
    let start_date = document.getElementById('start_date').value
    let end_date = document.getElementById('end_date').value


    // basic error handling
    let isValid = validateFields(city, start_date);

    if(isValid){
        console.log("Form Submitted", city, start_date)
        fetch(url_prod, {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city, start_date }), 
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res);
            buildInnerHTML(res, city, start_date, end_date);
        })
    }
}

function validateFields(city, start_date){
    if (!city || !start_date) {
        document.getElementById('error').innerText = 'Please make sure you fill out the destination and start date fields before you hit submit!';
        return false;
    }
    return true;
}

function buildInnerHTML(response, city, start_date, end_date = null) {
    let message = buildMessage(city, start_date, end_date)

    let button = document.createElement("button");
    button.innerText = "Save";
    button.onclick = Client.saveTrip();
    let results = document.getElementById('results');
    results.appendChild(button);

    document.getElementById('error').innerText = '';
    document.getElementById('temperature').innerText = `Temperature: ${response.temp} °C`;
    document.getElementById('description').innerText = response.description;
    document.getElementById('message').innerText = message;
    document.getElementById('image').src = response.image_web_url;
}

function buildMessage(city, start_date, end_date){

    let countdown = daysBetween(new Date(), new Date(start_date));
    let countdown_message = '';
    countdown > 0 ? countdown_message = `Your trip is in ${countdown} days.` : countdown_message = `Your trip is tomorrow.`;

    if(!end_date){
        return `You are going to ${city} on ${start_date}. ${countdown_message}`;
    } else {
        let days = daysBetween(new Date(start_date), new Date(end_date));
        return `You are going to ${city} for ${days} days on ${start_date}. ${countdown_message}`;
    }
}

function daysBetween(start_date, end_date){

    let time_diff = end_date.getTime() - start_date.getTime();
    let day_diff = time_diff / (1000 * 3600 * 24);
    return Math.floor(day_diff);
}

export { handleSubmit, daysBetween }