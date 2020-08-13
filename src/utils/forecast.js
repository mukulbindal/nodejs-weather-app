const request = require('request')
const forecast = (address, callback) => {
    const api_key = "86f73a8d8821133c1e650dd770db8dd8"
    var url = "https://api.openweathermap.org/data/2.5/weather?q="
        +encodeURIComponent(address)
        +"&appid="+api_key
        +"&units=metric"
    request({url : url, json:true}, (error,{body}={}) => {
        if(error) {
            callback('Could not connect to internet!',undefined)
        } else if (body.cod != 200) {
            callback(body.message,undefined)
        }  else {
            callback(undefined, (body.name + " : " +body.weather[0].description)+". It is currently "+(body.main.temp)+" degrees out. It is "+body.clouds.all+"% cloudyness in the sky." )
        }

    })
    
}

module.exports = forecast