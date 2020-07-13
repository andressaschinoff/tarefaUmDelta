window.addEventListener('load', start);

let currentLatitude = null;
let currentLongitude = null;
let map = null;

async function start() {
  await getLocation();
  await initMap();
  let locationTarget = document.getElementById('locationTarget');
  locationTarget.addEventListener('mousedown', handleLocationTarget);
}

async function reverseGeocode() {
  const latitude = await currentLatitude;
  const longitude = await currentLongitude;

  const res = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=7ecb87ae282d1f&lat=${latitude}&lon=${longitude}&format=json`
  );
  const json = await res.json();

  let locationInfo = document.getElementById('locationInfo');
  locationInfo.innerHTML = `${json.address.road}, ${json.address.house_number}`;
  locationInfo.classList.remove('hidden');
}

async function initMap() {
  map = L.map('mapView', {
    center: [-29.677667, -51.085914],
    zoom: 16,
  });

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVzc2FzY2hpbm9mZiIsImEiOiJja2Nod21nMDUxNjEzMzdvNTZzZjR4OGVoIn0.YpX87mqV9XZcSejx8OF4eQ',
    {
      attribution:
        '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token',
    }
  ).addTo(map);
}

function handleLocationTarget() {
  const icon = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div class='marker-container'><span class='marker-text'>Local da Ocorrência</span></div><div class='marker-line'></div><i class='material-icons marker-icon'>arrow_drop_down_circle</i>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  L.marker([currentLatitude, currentLongitude], { icon: icon }).addTo(map);
  const center = L.latLng(currentLatitude, currentLongitude);
  map.panTo(center);
  reverseGeocode();
}

async function handlePosition(position) {
  currentLatitude = await position.coords.latitude;
  currentLongitude = await position.coords.longitude;
}

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition);
  }
}
