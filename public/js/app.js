console.log('client side js loaded');

const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
messageTwo.textContent = ''

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetchLocation(location)
  })

const fetchLocation = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if(data.error){
        console.log(data.error);
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
}
