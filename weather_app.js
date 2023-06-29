const weatherAPI = async() =>{

    await buildObject();

}

//Add a catch and or try catch
const buildObject = async()=>{
    try{
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async(event)=>{
        event.preventDefault();
        const input = document.querySelector('#location');
        const location = input.value;
        const getAPI = await fetch(`http://api.weatherapi.com/v1/current.json?key=189309580c114ff1a0314558232406&q=${location}`, {mode: 'cors'});
        const APIJson = await getAPI.json();


      if (!getAPI.ok) {
        document.body.style.backgroundImage = 'url(images/allmight.jpeg)';
        const weatherDiv = document.querySelector('.weatherDiv');
        weatherDiv.innerHTML = "";
        const newDiv = document.createElement('div');
        newDiv.innerText = "This doesn't exist. \n WRONG!";
        weatherDiv.appendChild(newDiv);
        input.value = "";
        throw Error("Not a valid area!");

      }
        
        const weatherObject = {
            name: APIJson.location.name,
            tempC: APIJson.current.temp_c,
            tempF: APIJson.current.temp_f,
            condition: APIJson.current.condition.text,
            country: APIJson.location.country
        }
        changeBackground(weatherObject);
        await displayData(weatherObject);
        input.value = "";
    });
    }catch(error){
        console.error('Error: ',error);
    }
}

const displayData = async(weatherObject) =>{
    const weatherDiv = document.querySelector('.weatherDiv');
    weatherDiv.innerHTML = "";

    const name = document.createElement('div');
    name.innerText = weatherObject.name;
    name.classList.add('name');
    weatherDiv.appendChild(name);

    const country = document.createElement('div');
    country.innerText = weatherObject.country;
    weatherDiv.appendChild(country);

    const tempC = document.createElement('div');
    tempC.innerText = weatherObject.tempC + " C";
    weatherDiv.appendChild(tempC);

    const tempF = document.createElement('div');
    tempF.innerText = weatherObject.tempF + " F";
    tempF.classList.add('hide');
    weatherDiv.appendChild(tempF);

    const condition = document.createElement('div');
    condition.innerText = weatherObject.condition;
    weatherDiv.appendChild(condition);

    const tempButton = document.createElement('button');
    tempButton.innerText = "Changer";
    weatherDiv.appendChild(tempButton);
    tempButton.addEventListener('click', ()=>{
        tempC.classList.toggle('hide');
        tempF.classList.toggle('hide');
    });

}

//Add an image switcher based off of the condition
//Add a temp flipper from C to F

//Got this mostly to display an image based off the condition
//Just have to figure out how to see what possible variations there are
const changeBackground = (weatherObject) => {
    if(weatherObject.condition.toLowerCase().includes("rain")||weatherObject.condition.toLowerCase().includes("drizzle")){
        document.body.style.backgroundImage = 'url(images/totoro.jpeg)';
    }
    else if(weatherObject.condition.toLowerCase().includes("sunny")||weatherObject.condition.toLowerCase().includes("clear")){
        document.body.style.backgroundImage = 'url(images/sunnyNawa.jpeg)';
    }
    else if(weatherObject.condition.toLowerCase().includes("overcast") 
    || weatherObject.condition.toLowerCase().includes("cloudy")
    ||weatherObject.condition.toLowerCase().includes("mist")){
        document.body.style.backgroundImage = 'url(images/overcast.jpeg)';
    }    else if(weatherObject.condition.toLowerCase().includes("snow")){
        document.body.style.backgroundImage = 'url(images/snow.png)';
    }
}

weatherAPI();
