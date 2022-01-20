const request= require('request')


const forecast=(latitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=8a2a54b5f7c2c565c8eae3d09f337b62&query=' + latitude + ',' + longitude  + ' &units=f'  
   
request({url,json:true},(error,{body})=>{
    if(error){
    callback('Unable To connect to location services',undefined)
    
    }
    else if (body.error){
    callback('Unabel to find location . Try another time',undefined )
    }else{
    callback(undefined,'The weather today is '+body.current.weather_descriptions[0]+ '. It is Currently '+ body.current.temperature+' degrees out there. the humidity is ' + body.current.humidity +' degress ,with a precipitation of '+body.current.precip+' % chance')
    
}
})
}



module.exports=forecast