function handleSubmit(event) {
    event.preventDefault();
    let url_prod = '/api';

    // pick out values from HTML inputs
    let city = document.getElementById('city').value
    let date = document.getElementById('date').value
    // basic error handling
    let isValid = validateFields(city, date);

    if(isValid){
        console.log("Form Submitted", city, date)
        fetch(url_prod, {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city, date }), 
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res);
            buildInnerHTML(res, city);
        })
    }
}

function validateFields(city, date){
    if (!city || !date) {
        document.getElementById('error').innerText = 'You need to fill out both fields before you hit submit';
        return false;
    }
    return true;
}

function buildInnerHTML(response, city) {
    document.getElementById('error').innerText = '';
    document.getElementById('temperature').innerText = response.temp;
    document.getElementById('description').innerText = response.description;
    document.getElementById('city').innerText = city;
    document.getElementById('image').src = response.image_web_url;
}

export { handleSubmit }
