let wrapper = document.querySelector(".wrapper");
let firstTab = document.querySelector(".yourWeatherTab");
let searchTab = document.querySelector(".searchWeatherTab");
let wrapper1 = document.querySelector(".wrapper1");
let card2 = document.querySelector(".card2");
let card3 = document.querySelector(".card3");
let wrapper2 = document.querySelector(".wrapper2");
let wrapper3 = document.querySelector(".wrapper3");
let wrapper4 = document.querySelector(".wrapper4");
let spinner_6 = document.querySelector(".spinner-6");
let wrapper5 = document.querySelector(".wrapper5");
let grantAccessBtn = document.querySelector(".grantAccessBtn");
let searchWeatherBar = document.querySelector("#searchWeatherBar");
let searchBar_Form = document.querySelector(".searchBar_Form");
let searchBtn = document.querySelector(".searchBtn");
// let areaName = document.querySelector(".areaName");
// let countryImg = document.querySelector(".countryImg");
// let areaUpdate = document.querySelector(".areaUpdate");
// let areaUpdateImg = document.querySelector(".areaUpdateImg");
// let tempraturePara = document.querySelector(".tempraturePara");
// let windSpeedDataPara = document.querySelector(".windSpeedDataPara");
// let humidityDataPara = document.querySelector(".humidityDataPara");
// let cloudyDataPara = document.querySelector(".cloudyDataPara");




let currentTab = firstTab;
const api_Key = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("activeForTabBg");
getFromSessionStorage();


firstTab.addEventListener('click', ()=> {
    switchTab(firstTab);
})


searchTab.addEventListener('click', ()=> {
    switchTab(searchTab);
})


grantAccessBtn.addEventListener('click', getLocation);


searchBar_Form.addEventListener('submit', (e)=>{
    e.preventDefault();

    try {
        let cityName = searchWeatherBar.value;
        if(cityName==="") return;
        
        fetchSearchWeatherInfo(cityName);
    } catch (error) {
        console.log("yaha check karo", error);
    }
});


function switchTab(clickedTab) {
    if (clickedTab !== currentTab) {
        currentTab.classList.remove("activeForTabBg");
        currentTab = clickedTab;
        currentTab.classList.add("activeForTabBg");

        if(!wrapper2.classList.contains("active")){
            wrapper1.classList.remove("active");
            wrapper3.classList.remove("active");
            wrapper2.classList.add("active");
        }
        else{
            wrapper2.classList.remove("active");
            wrapper3.classList.add("active");
            getFromSessionStorage()
        }  
    }
}



function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if (!localCoordinates) {
        wrapper3.classList.add("active");
    }

    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchWeather(coordinates);
    }
}



async function fetchWeather(coordinates) {

    const {lat, lon} = coordinates;
    wrapper3.classList.remove("active");
    wrapper4.classList.add("active");


    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_Key}&units=$metrics`);

       const data = await res.json();
       wrapper4.classList.remove("active");
       wrapper1.classList.add("active");

       renderWeatherInfo(data);

    }
    catch (error) {
        wrapper4.classList.remove("active");
       console.log(`Failed to Get`, error);
    }
}



function renderWeatherInfo(weatherData) {
    let areaName = document.querySelector(".areaName");
    let countryImg = document.querySelector(".countryImg");
    let areaUpdate = document.querySelector(".areaUpdate");
    let areaUpdateImg = document.querySelector(".areaUpdateImg");
    let tempraturePara = document.querySelector(".tempraturePara");
    let windSpeedDataPara = document.querySelector(".windSpeedDataPara");
    let humidityDataPara = document.querySelector(".humidityDataPara");
    let cloudyDataPara = document.querySelector(".cloudyDataPara");


    areaName.innerText = weatherData?.name;
    // countryImg.src = `https://flagcdn.com/144x108/.png`;
    countryImg.src = `https://flagcdn.com/144x108/${weatherData?.sys?.country}.png`;

    areaUpdate.innerText = weatherData?.weather?.[0]?.description;

    areaUpdateImg.src = `https://flagcdn.com/144x108/${weatherData?.weather?.[0]?.icon}.png`;

    tempraturePara.innerText = weatherData?.main?.temp;
    windSpeedDataPara.innerText = weatherData?.wind?.speed;
    humidityDataPara.innerText = weatherData?.main?.humidity;
    cloudyDataPara.innerText = weatherData?.clods?.all;
}



function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("GeoLocation Not Supported");
    }

    // console.log(showPosition(userCoordinates));
}



function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.lattitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchWeather(userCoordinates);
    // wrapper3.classList.remove("active");
}



async function fetchSearchWeatherInfo(city) {
    wrapper4.classList.add("active");
    wrapper3.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=$metrics`);

        let content = await response.json();

        wrapper4.classList.remove("active");
        // wrapper2.classList.add("wrapper2Active");
        wrapper1.classList.add("active");

        renderWeatherInfo(content);

    } catch (error) {
        console.log("yaha hai error", error);
    }
}