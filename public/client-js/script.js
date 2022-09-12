'use strict';
const input = document.querySelector('main input')
const button = document.querySelector('main button')
const successMessage = document.querySelector('.success')
const errorMessage = document.querySelector('.error')

button.addEventListener('click', (e) => {
    errorMessage.textContent = ''
    successMessage.textContent = 'Loading'
    e.preventDefault()
    const location = input.value
    if (location) {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then(data => {
                if (data.error) {
                    errorMessage.textContent = data.error
                    successMessage.textContent = ''
                } else {
                    successMessage.textContent = `In ${data.location}, ${data.country}
                    it is ${data['weather_descriptions']} with a temperature of ${data.temperature}`
                }
            }).catch(e => {
                errorMessage.textContent = e
            })
        })
    } else {
        errorMessage.textContent = 'You must enter an address'
    }


})