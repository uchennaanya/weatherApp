const version = "1.0.0";
const cacheName = `weather-${version}`;
const staticAssets = [
  `/`,
  `/index.html`,
  `/style/css/style.css`,
  `/app.js`,
  '/images/logo.jpg',
  `/images/logo2.png`,
  '/site.webmanifest',
  '/style/css/bootstrap.min.css',
  '/style/js/jquery-3.5.1.slim.min.js',
  '/images/clear.jpg',
  '/images/cloud.jpg',
  '/images/haze.jpg',
  '/images/mist.jpg',
  '/images/rain.jpg',
  '/images/thunder.jpg',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
  'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCxc4AMP6lbBP.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2',
  "https://api.openweathermap.org/data/2.5/weather?lat=6.5568767999999995&lon=3.3488895999999997&appid=ab10a3236deef1412aa1c77a98da8084&units=metric",
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('Caching assests');
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
        );
    })
  );
});


self.addEventListener('fetch', event => {
  console.log('fetch event ');
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    })
    .catch(error => {
      console.log(error);
    })
  );
});
