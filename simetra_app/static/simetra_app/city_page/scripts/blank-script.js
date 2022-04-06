"use strict";

const citiesUnparsed = JSON.parse(
  document.getElementById("cities_attrs_by_groups_list_json").textContent
);

const citiesAttrVerboseNameUnparsed = JSON.parse(
  document.getElementById("city_attr_verbose_names_list_json").textContent
);

const nameCity = document.location.pathname.slice(
  8,
  document.location.pathname.length - 1
);

function findCity() {
  for (let i = 0; i < citiesUnparsed.length; i++) {
    const cityUnparsed = citiesUnparsed[i];
    const city = JSON.parse(cityUnparsed);
    if (city["name"] === nameCity) {
      return city;
    }
  }
}
const cityObj = findCity();