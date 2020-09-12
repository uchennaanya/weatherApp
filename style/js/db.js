// 'use strict';

// // const dbName = 'weatherAppPwa';
// // const version = 1;
// // const storeName = 'weatherInfo';

// async function createDatabase() {
//     if (!('indexedDB' in window)) {
//         console.log('The browser does\'t support indexedDB');
//         return;
//     }


//     console.log('Hello');
//     const request = await indexedDB.open(dbName,version);

//     request.onupgradeneeded = async function (e){
//         db = await e.target.result;
//         await db.createObjectStore(storeName,{keyPath:'name'});
//         console.log('Upgrade called');
//     }
//     request.onupgradeneeded = async function (e){
//         db = await e.target.result;
//         console.log('success is called');
//     }
//     request.onerror = e => {
//         console.log(e.target.error);
//     }
// }

// async function getWeatherInfoFromIndexDB(name){
//     const tx = await db.transaction(storeName, 'readonly');
//     const info = tx.objectStore(storeName)

//     const request = await info.openCursor(name);

//     request.onsuccess = e => {
//         const cursor = e.target.result;

//         if(cursor){
//             console.log(cursor.value);
//             container.innerHTML = `
    
//             <div class="card mt-2 mb-2" style="width:15rem;">
//                 <div class="card-body" id="main">
//                     <h5 class="card-title text-center" id='name'>${cursor.value.name}, ${cursor.value.sys.country}<img src="https://openweathermap.org/img/w/${cursor.value.weather[0].icon}.png" class="img-responsive" alt="icon"></h5>
//                     <p class="card-text temp text-center" id='temp'>${ cursor.value.main.temp }<small><sup>&deg;<small><sup>c</sup></small></sup></p>
//                 </div>
//                 <ul class="list-group list-group-flush">
//                     <li class="list-group-item text-center head">${ cursor.value.weather[0].main }</li>
//                     <li class="list-group-item text-center">Humidity:${ cursor.value.main.humidity }%</li>
//                     <li class="list-group-item text-center">Wind:${ cursor.value.wind.speed }<sup>mph</sup></li>
//                     <li class="list-group-item text-center">Time: ${ new Date(cursor.value.dt * 1000).toTimeString() }</li>
//                     <li class="list-group-item text-center">Date: ${ new Date(cursor.value.dt * 1000).toDateString() } </li>
//                 </ul>
//             </div>`;

//             if(cursor.value.weather[0].main === 'Clouds'){
//                 document.getElementById('main').style.background = `url(/images/cloud.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-dark');
//                 document.getElementById('temp').classList.add('text-dark');
//             }
//             else if(cursor.value.weather[0].main === 'Rain'){
//                 document.getElementById('main').style.background = `url(/images/rain.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.width = '100% !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-white');
//                 document.getElementById('temp').classList.add('text-white');
//             }
//             else if(cursor.value.weather[0].main === 'Clear'){
//                 document.getElementById('main').style.background = `url(/images/clear.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.width = '100% !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-white');
//                 document.getElementById('temp').classList.add('text-white');
//             }
//             else if(cursor.value.weather[0].main === 'Haze'){
//                 document.getElementById('main').style.background = `url(/images/haze.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.width = '100% !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-dark');
//                 document.getElementById('temp').classList.add('text-dark');
//             }
//             else if(cursor.value.weather[0].main === 'Thunder'){
//                 document.getElementById('main').style.background = `url(/images/thunder.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.width = '100% !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-dark');
//                 document.getElementById('temp').classList.add('text-dark');
//             }else if(cursor.value.weather[0].main === 'Mist'){
//                 document.getElementById('main').style.background = `url(/images/mist.jpg)`;
//                 document.getElementById('main').style.backgroundSize = 'cover !important';
//                 document.getElementById('main').style.width = '100% !important';
//                 document.getElementById('main').style.backgroundRepeat = 'no-repeat !important';
//                 document.getElementById('name').classList.add('text-dark');
//                 document.getElementById('temp').classList.add('text-dark');
//             }

//             cursor.continue()
//         }
//     }
//     request.onerror = e => {
//         console.log(e.target.error);
//     }
// }
