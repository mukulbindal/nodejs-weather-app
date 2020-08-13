console.log("Client side JS loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('#location')
const msg = document.querySelector('#msg')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = search.value 
    
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return msg.textContent = data.error 
            }
            msg.textContent = data.forecast
        })
    })
})