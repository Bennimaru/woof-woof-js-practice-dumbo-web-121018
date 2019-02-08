document.addEventListener("DOMContentLoaded",()=>{
console.log("hello")

const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

const dogs = function fetchDogs(){
  fetch("http://localhost:3000/pups")
  .then(res =>res.json())
  .then(dogs =>
  dogs.forEach(showDogsOnDom))
}

function showDogsOnDom(dog){
  const dogSpan = document.createElement("span")
  dogSpan.dataset.id = dog.id,
  dogSpan.className = "dog",
  dogSpan.innerText = dog.name,
  dogBar.append(dogSpan)
}
function addEventListenerToDogBar(event){
  dogBar.addEventListener("click",(event)=>{
    event.preventDefault()
    if (event.target.className === "dog"){
      const dogId = event.target.dataset.id
      fetch(`http://localhost:3000/pups/${dogId}`)
      .then(res => res.json())
      .then(clickedDog => formatDog(clickedDog))
    }
  })
}
  function formatDog(clickedDog){
    // const dogStatus = function(){
    //   if (`${clickedDog.isGoodDog}` === "true"){
    //     return "Good Dog!"
    //   }else{
    //     return "Bad Dog!"
    //   }
    // }
    // dogInfo.innerHTML=
    // `<img src=${clickedDog.image}>
    // <h2> ${clickedDog.name} </h2>
    // <button type=text>${dogStatus()}</button>
    // `
    dogInfo.innerHTML=""
    const dogImage = document.createElement("img")
      dogImage.src = clickedDog.image
    const dogName = document.createElement("h2")
      dogName.innerText = clickedDog.name
    const dogButton = document.createElement("button")
      dogButton.innerText = clickedDog.isGoodDog? "Good Dog!" : "Bad Dog!"
      dogButton.dataset.id = clickedDog.id
      dogButton.addEventListener("click",dogButtonClick)

    dogInfo.append(dogImage,dogName,dogButton)
  }

  function dogButtonClick(event){
    let newValue
    const buttonId = event.target.dataset.id
    if (event.target.innerText.includes("Good")){
      event.target.innerText = "Bad Dog!"
      newValue = "false"
    }else{
      event.target.innerText = "Good Dog!"
      newValue = "true"
    }
    toggleDogStatus(buttonId,newValue)
  }

  function toggleDogStatus(buttonId,newValue){
    fetch(`http://localhost:3000/pups/${buttonId}`),{
      method: "PATCH",
      header:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    }
  }


dogs()
addEventListenerToDogBar()
formatDog()
dogButtonClick()
toggleDogStatus()

})
