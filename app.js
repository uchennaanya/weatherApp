"use strict"

/***
 * Name: Weather App
 * Description: This is a simple weather progressive web app
 * Author Name: Uchenna Martins Anya
 * Email: martinsanya19@gmail.com
 * Github: https://www.github.com/uchennaanya
 * 
 * ***/



//  Service worker registeration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker Registered: ', registration
                .scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// All containers for storing weather infomations after fetching
let form = document.querySelector('form');
let info = document.getElementById('location');
let container = document.getElementById('weather_info');
let error = document.getElementById('error');
let db = null;
const dbName = 'weatherAppPwa';
const version = 1;
const storeName = 'weatherInfo';
let apiId = 'ab10a3236deef1412aa1c77a98da8084'; // openweather apiKey

// Listening to search and click events
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(info.value === ''){
        error.innerText = 'City or country is required...';
    }else{
        error.innerText = '';
        createDatabase();
        setTimeout(() => {
            getWeatherInfoFromIndexDB();
        },2000);
        getWeatherInfo(info); // Calling the get weather function
    }
});
// Async function that fetch the weather information based on the user location Lattitude and Longitude
async function getWeatherInfo(location) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.value}&APPID=${apiId}&units=metric`)
        .then(response => response.json())
        .then(data => {
            createDatabase();
            setTimeout(() => {
                (async function(){
                    const tx = await db.transaction(storeName,'readwrite');
    
                    const store = tx.objectStore(storeName);
                    console.log(store);
                    store.add(data);
                }());
            },500);
        }).catch(error => {
            container.innerHTML = `<p class="center-text text-whie">No weather information for your search</p>`;
        
                console.log(error);
        });
}

async function createDatabase() {
    if (!('indexedDB' in window)) {
        console.log('The browser doesn\'t support indexedDB');
        return;
    }

    const request = await indexedDB.open(dbName,version);

    request.onupgradeneeded = async(e) => {
         db = await e.target.result;
        const weatherInfo = db.createObjectStore(storeName,{keyPath:'name'});
        console.log('Upgrade called');
    }
    request.onsuccess = e => {
        db = e.target.result;
        console.log('success is called');
        getWeatherInfoFromIndexDB();
    }
    request.onerror = e => {
        console.log(e.target.error);
    }
}

async function getWeatherInfoFromIndexDB(){
    const tx = await db.transaction(storeName, 'readonly');
    const info = tx.objectStore(storeName)

    const request = await info.openCursor();

    request.onsuccess = (e) => {
        const cursor = e.target.result;
        if(cursor){
                container.innerHTML = `
        
                <div class="card mt-2 mb-2" style="width:15rem;">
                    <div class="card-body" id="main">
                        <h5 class="card-title text-center" id='name'>${cursor.value.name}, ${cursor.value.sys.country}<img src="https://openweathermap.org/img/w/${cursor.value.weather[0].icon}.png" class="img-responsive" alt="icon"></h5>
                        <p class="card-text temp text-center" id='temp'>${ cursor.value.main.temp }<small><sup>&deg;<small><sup>c</sup></small></sup></p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item text-center head">${ cursor.value.weather[0].main }</li>
                        <li class="list-group-item text-center">Humidity:${ cursor.value.main.humidity }%</li>
                        <li class="list-group-item text-center">Wind:${ cursor.value.wind.speed }<sup>mph</sup></li>
                        <li class="list-group-item text-center">Time: ${ new Date(cursor.value.dt * 1000).toTimeString() }</li>
                        <li class="list-group-item text-center">Date: ${ new Date(cursor.value.dt * 1000).toDateString() } </li>
                    </ul>
                </div>`;
    
                if(cursor.value.weather[0].main === 'Clouds'){
                    document.getElementById('main').style.background = `url(images/cloud.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-dark');
                    document.getElementById('temp').classList.add('text-dark');
                }
                else if(cursor.value.weather[0].main === 'Rain'){
                    document.getElementById('main').style.background = `url(images/rain.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.width = '100% !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-white');
                    document.getElementById('temp').classList.add('text-white');
                }
                else if(cursor.value.weather[0].main === 'Clear'){
                    document.getElementById('main').style.background = `url(images/clear.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.width = '100% !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-white');
                    document.getElementById('temp').classList.add('text-white');
                }
                else if(cursor.value.weather[0].main === 'Haze'){
                    document.getElementById('main').style.background = `url(images/haze.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.width = '100% !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-dark');
                    document.getElementById('temp').classList.add('text-dark');
                }
                else if(cursor.value.weather[0].main === 'Thunder'){
                    document.getElementById('main').style.background = `url(images/thunder.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.width = '100% !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-dark');
                    document.getElementById('temp').classList.add('text-dark');
                }else if(cursor.value.weather[0].main === 'Mist'){
                    document.getElementById('main').style.background = `url(images/mist.jpg)`;
                    document.getElementById('main').style.backgroundSize = 'cover !important';
                    document.getElementById('main').style.width = '100% !important';
                    document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
                    document.getElementById('name').classList.add('text-dark');
                    document.getElementById('temp').classList.add('text-dark');
                }
            cursor.continue();
        }
    }
}
