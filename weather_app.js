const weatherAPI = async() =>{

    await buildObject();

}

const buildObject = async()=>{

    const form = document.querySelector('form');

    form.addEventListener('submit', async(event)=>{
        event.preventDefault();
        const input = document.querySelector('#location');
        const location = input.value;
        const getAPI = await fetch(`http://api.weatherapi.com/v1/current.json?key=189309580c114ff1a0314558232406&q=${location}`, {mode: 'cors'});
        const APIJson = await getAPI.json();
        
        const weatherObject = {
            name: APIJson.location.name,
            tempC: APIJson.current.temp_c,
            tempF: APIJson.current.temp_f,
            condition: APIJson.current.condition.text
        }
        changeBackground(weatherObject);
        await displayData(weatherObject);
    });
}

const displayData = async(weatherObject) =>{
    const weatherDiv = document.querySelector('.weatherDiv');
    weatherDiv.innerHTML = "";

    const name = document.createElement('div');
    name.innerText = weatherObject.name;
    name.classList.add('name');
    weatherDiv.appendChild(name);

    const tempC = document.createElement('div');
    tempC.innerText = weatherObject.tempC;
    weatherDiv.appendChild(tempC);

    const tempF = document.createElement('div');
    tempF.innerText = weatherObject.tempF;
    weatherDiv.appendChild(tempF);

    const condition = document.createElement('div');
    condition.innerText = weatherObject.condition;
    weatherDiv.appendChild(condition);
}

//Add an image switcher based off of the condition
//Add a temp flipper from C to F

//Got this mostly to display an image based off the condition
//Just have to figure out how to see what possible variations there are
const changeBackground = (weatherObject) => {
    if(weatherObject.condition.toLowerCase() === "light rain"){
        document.body.style.backgroundImage = 'url(images/london.jpeg)';
    }
}




weatherAPI();
