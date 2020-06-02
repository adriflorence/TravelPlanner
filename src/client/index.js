import { handleSubmit } from './js/formHandler'
import { saveTrip, loadTrips } from './js/handleTrips'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

window.onload = (event) => {
    loadTrips();
};

// Js files are being exported to 'Client' library (Output set in webpack.dev.js)
export {
    handleSubmit,
    saveTrip
}