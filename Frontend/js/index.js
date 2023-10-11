let map;
let infoWindow;
let markers = [];

function initMap() {
  let sanMateo = { lat: 37.563, lng: -122.3255 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: sanMateo,
    mayTypeId: "roadmap",
  });
  infoWindow = new google.maps.InfoWindow();
}

const getStores = () => {
  const zipCode = document.getElementById("zip-code").value;
  // if (!zipCode || zipCode.length != 5 || !isStringDigits(zipCode)) {
  //   clearLocations();
  //   InvalidZipCode();
  //   return;
  // }
  const API_URL = "http://127.0.0.1:3000/api/stores?";
  fetch(
    API_URL +
      new URLSearchParams({
        zip_code: zipCode,
      })
  )
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        console.log("hey");
        throw new Error("No stores found");
      }
    })
    .then((data) => {

      const { updatedCount, stores } = data;

      if (stores.length > 0) {
        clearLocations();
        searchLocationNear(stores);
        setStoresList(stores);
        setOnClickListener();
        
        const updatedCountParagraph = document.getElementById("updated-count");
        updatedCountParagraph.textContent = "This has been searched for " + updatedCount + " times today! ";
        console.log("updatedCount here: " + updatedCount);
      } else {
        clearLocations();
        noStoresFound();
      }
    })
    .catch((error) => {
      clearLocations();
      InvalidZipCode();
      return;
    });
};

const setStoresList = (stores) => {
  let storesHtml = ``;
  stores.forEach((store, index) => {
    storesHtml += `        
      <div class="store-container">
          <div class="store-container-background">
            <div class="store-info-container">
              <div class="store-address">
                <span>${store.addressLines[0]}</span>
                <span>${store.addressLines[1]}</span>
              </div>
              <div class="store-phone-number">${store.phoneNumber}</div>
            </div>
            <div class="store-number-container">
              <div class="store-number">${index + 1}</div>
            </div>
          </div>
        </div>`;
  });
  document.querySelector(".stores-list").innerHTML = storesHtml;
};

const searchLocationNear = (stores) => {
  let bounds = new google.maps.LatLngBounds();
  stores.forEach((store, index) => {
    var latlng = new google.maps.LatLng(
      store.location.coordinates[1],
      store.location.coordinates[0]
    );
    let name = store.storeName;
    let address = store.addressLines[0];
    let openStatusText = store.openStatusText;
    let phoneNumber = store.phoneNumber;
    bounds.extend(latlng);
    createMarker(latlng, name, address, index + 1, openStatusText, phoneNumber);
  });
  map.fitBounds(bounds);
};

const setOnClickListener = () => {
  let storeElements = document.querySelectorAll(".store-container");
  storeElements.forEach((element, index) => {
    element.addEventListener("click", () => {
      google.maps.event.trigger(markers[index], "click");
    });
  });
};

const createMarker = (
  latlng,
  name,
  address,
  storeNumber,
  openStatusText,
  phoneNumber
) => {
  let html = `
    <div class="store-info-window">
      <div class="store-info-name">
        ${name}
      </div>
      <div class="store-info-open-status">
        ${openStatusText}
      </div>
      <div class="store-info-address">
        <div class="icon">
          <i class="fas fa-location-arrow"></i>
        </div>
        <span>
          ${address}
        </span>
      </div>
      <div class="store-info-phone">
        <div class="icon">
          <i class="fas fa-phone-alt"></i>
        </div>
        <span>
          <a href="tel:${phoneNumber}"> ${phoneNumber} </a>
        </span>
      </div>
    </div>
  `;
  let marker = new google.maps.Marker({
    position: latlng,
    map: map,
    label: `${storeNumber}`,
  });

  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
};

const clearLocations = () => {
  infoWindow.close();
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
};

const onEnter = (e) => {
  if (e.key == "Enter") {
    getStores();
  }
};

const noStoresFound = () => {
  const html = `<div class="no-stores-found">No Stores Found</div>`;
  document.querySelector(".stores-list").innerHTML = html;
};

const InvalidZipCode = () => {
  const html = `<div class="invalid-zip-code">Invalid Zip Code</div>`;
  document.querySelector(".stores-list").innerHTML = html;
};

const isStringDigits = (inputString) => {
  for (let i = 0; i < inputString.length; i++) {
    if (!/^\d$/.test(inputString[i])) {
      return false;
    }
  }
  return true;
};