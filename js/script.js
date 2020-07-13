window.addEventListener('load', init);

// const currentUser = 'Gabriel Jesus';
const currentUser = 'José Fernando';

let allVehicles = [];

function init() {
  fetchVehicles();
  const confirmatinBtn = document.getElementById('confirmatinBtn');
  confirmatinBtn.addEventListener('mousedown', handleVehicleInfo);
}

async function fetchVehicles() {
  const res = await fetch('../api/vehicleRegistration.json');
  const json = await res.json();

  allVehicles = json;
}

function handleVehicleInfo() {
  const footerContainer = document.getElementById('footerContainer');
  footerContainer.classList.remove('hidden');

  const currentVehicle = allVehicles.find(({ owner }) => owner === currentUser);

  const vehicleImg = document.getElementById('vehicleImg');
  vehicleImg.src = `../assets/${currentVehicle.brandLogo}`;

  const plateInfo = document.getElementById('plateInfo');
  plateInfo.innerHTML = `${currentVehicle.plate}`;

  const newProtocol = Math.floor(Math.random() * 1000000000000);

  const protocolNumber = document.getElementById('protocolNumber');
  protocolNumber.innerHTML = `${newProtocol}`;
}
