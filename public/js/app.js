

const weatherForm=document.querySelector('form')
    const search=document.querySelector('input')
    const messageOne=document.querySelector('#message-1')
    const messageTwo=document.querySelector('#message-2')

    messageOne.textContent='From JavaScript file'


weatherForm.addEventListener('submit',(e) => {
e.preventDefault()

const location = search.value
messageOne.textContent='loading'
messageTwo.textContent=''
fetch('/weather?adress='+location).then((response)=>{
response.json().then((data)=>{
if(data.error){
 (data.error)
 messageOne.textContent=(data.error)

}else{
(data.location),
(data.forecast)
messageOne.textContent=(data.location)
messageTwo.textContent=(data.forecast)

}
})
})



    console.log(location)
})