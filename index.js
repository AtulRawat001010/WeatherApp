const api_Key = "d1845658f92b31c64bd94f06f7188c9c";

async function showWeather() {
    let city = "delhi";
    
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=$metrics`);

       const data = await res.json();
       console.log("weather DATA IS", data);

       let div = document.createElement("p");
       div.textContent = (`${data?.main?.temp.toFixed(2)}`);
       document.body.appendChild(div);
    } 
    
    catch (error) {
       console.log(`Failed to Get, error in the Api call`, error);
    }
    // console.log(`${data?.main?.temp.toFixed(2)}`);
}; // // // //{allTheseAreA MendatoryThingsToFetchDataFromAnAPI}


let secondTab = document.querySelectorAll(".searchWeatherTab");
let wrapper = document.querySelector(".wrapper");
let wrapper2 = document.querySelector(".wrapper2");
let wrapper3 = document.querySelector(".wrapper3");
let wrapper4 = document.querySelector(".wrapper4");
let wrapper5 = document.querySelector(".wrapper5");
let card2 = document.querySelector(".card2");
let card3 = document.querySelector(".card3");
let frstTab = document.querySelectorAll(".yourWeatherTab");

let scndt = secondTab[0];
let tab2Bg = secondTab[1];

let frstT = frstTab[1];
let tab1Bg = frstTab[1];

scndt.addEventListener('click', secondTabListnerFunc);

frstT.addEventListener('click', firstTabListnerFunc);

function secondTabListnerFunc() {
    wrapper2.classList.add("wrapper2active");
    wrapper.classList.add("wrapperDeactive");
    wrapper3.classList.add("wrapperDeactive");
    wrapper4.classList.add("wrapperDeactive");
    // wrapper5.classList.add("wrapper5notFoundActive");
    tab2Bg.classList.add("addBgColor");
    tab1Bg.classList.add("clearBgColor");
};

function firstTabListnerFunc() {
    wrapper2.classList.remove("wrapper2active");
    wrapper.classList.remove("wrapperDeactive");
    wrapper3.classList.remove("wrapperDeactive");
    wrapper4.classList.remove("wrapperDeactive");
    // wrapper5.classList.remove("wrapper5notFoundActive");
    tab2Bg.classList.remove("addBgColor");
    tab1Bg.classList.remove("clearBgColor");
};