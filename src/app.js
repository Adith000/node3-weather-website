const path=require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

//Define path for Express config
const app = express()
const publicDirectoryPath=path.join(path.join(__dirname,'../public'))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handelbars engine and views location
app.set('views', path.join(__dirname, '../views'));

app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Setup stactic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index.hbs',{

        title:'Weather App',
        name:'Adith KP'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
title:'About pokemon',
name:'Adith K P'
    })
})


app.get('/help',(req,res)=>{
res.render('help.hbs',{
title:'This is the help page',
name:'Adith KP'

})

})

app.get('/help/*',(req,res)=>{
    res.render('error.hbs',{
        title:'404',
        name:'Adith Kp',
        errorMessage:'Artice not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error:'Please provide an adress',
        })
    }

    geocode(req.query.adress,(error, { latitude, longitude, location}={})=>{
if(error){

   return res.send({error})
}

forecast(latitude , longitude,(error,forecastData)=>{
    if(error){
        return res.send({error})
    }
    res.send({
        forecast:forecastData,
        location,
        adress:req.query.adress
})

})

})


})

app.get('/products',(req,res)=>{
if(!req.query.search){
   return  res.send({
        error:'You must provide a search term'
    })
}

console.log(req.query)
    res.send({
        products:[]

    })
})
app.get('*',(req,res)=>{
res.render('error.hbs',{
title:'404',
name:'Adith KP',
errorMessage:'page Not found'

})

})

app.listen(3000,() =>{

    console.log(' Server is runnig on port 3000.')
})