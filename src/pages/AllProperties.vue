<template>
  <div class="container py-5">
    <div
      class="m-5 d-flex justify-content-center align-items-center text-white"
    >
      <div class="col-md-12">
        <label for="address" class="form-label text-uppercase fw-bold"
          >Indirizzo *</label
        >
        <div id="address" class="bg-white"></div>
        <div class="mt-3">
          <button @click="searchApartments()">Cerca appartamenti</button>
        </div>
        <div class="d-flex justify-content-center gap-2">
          <div>
            <label for="beds">beds</label>
            <select name="beds" id="beds">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label for="rooms">rooms</label>
            <select name="rooms" id="rooms">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label for="radius">radius</label>
            <select name="radius" id="radius">
              <option value="20" default>20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div>
            <label for="services">services</label>
            <select name="services" id="services">
              <option value="">all results</option>
              <option value="1">wifi</option>
              <option value="2">Posto Macchina</option>
              <option value="3">Piscina</option>
              <option value="4">Portineria</option>
              <option value="5">Sauna</option>
              <option value="6">Vista Mare</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex flex-wrap">
          <div
            class="col-12 col-md-6 mb-4"
            v-for="(property, index) in properties"
            :key="property.id"
          >
            <div class="card h-100 m-2">
              <img
                :src="`http://127.0.0.1:8000/storage/${property.images[0].path}`"
                alt=""
                class="card-img"
                v-if="property.images.length > 0"
              />
              <img
                src="https://www.leonardospada.it/wp-content/uploads/2022/09/errore-404-pagina-non-trovata-1024x576.jpg"
                alt="Image-Not-Found"
                class="h-100"
                v-else
              />
              <div class="card-body">
                <h4 class="fw-bold text-warning">
                  <router-link
                    :to="{
                      name: 'single-property',
                      params: { slug: property.slug },
                    }"
                  >
                    {{ property.title }}
                  </router-link>
                </h4>
                <div class="row">
                  <div class="col-4">
                    <p>
                      <span class="fw-bold"
                        ><i class="fa-solid fa-bed"></i> Camere: </span
                      >{{ property.rooms }}
                    </p>
                  </div>
                  <div class="col-4">
                    <p>
                      <span class="fw-bold"
                        ><i class="fa-solid fa-sink"></i> Bagni: </span
                      >{{ property.bathrooms }}
                    </p>
                  </div>
                  <div class="col-4">
                    <p>
                      <span class="fw-bold"
                        ><i class="fa-solid fa-ruler-combined"></i> Metri
                        quadri: </span
                      >{{ property.square_meters }}
                    </p>
                  </div>
                  <div class="col-6 text-center">
                    <p>
                      <span class="fw-bold"
                        ><i class="fa-solid fa-map-location"></i>
                        Indirizzo: </span
                      >{{ property.address }}
                    </p>
                  </div>
                  <div class="col-6 text-center">
                    <p>
                      <span class="fw-bold"
                        ><i class="fa-solid fa-bell-concierge"></i>
                        Servizi: </span
                      ><span
                        v-for="service in property.services"
                        class="me-2"
                        >{{ service.name }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import  visitStore   from "../visitStore"; 
import axios from "axios";
export default {
  name: "searchBar",
  data() {
    return {
      city: "",
      properties: [],
    };
  },
  mounted() {
    let options = {
      searchOptions: {
        key: "6Zdz4adkb3YzaPURg8Zg71KMzMez217G",
        language: "it-IT",
        limit: 5,
      },
      autocompleteOptions: {
        key: "6Zdz4adkb3YzaPURg8Zg71KMzMez217G",
        language: "it-IT",
      },
      labels: {
        noResultsMessage: "Nessun risultato trovato.",
      },
    };

    var ttSearchBox = new SearchBox(services, options);
    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    const input = document.getElementById("address");
    input.append(searchBoxHTML);
    let ttInputBg = document.querySelector(".tt-search-box");
    let ttInputContainer = document.querySelector(
      ".tt-search-box-input-container"
    );
    let ttInput = document.querySelector("input.tt-search-box-input");
    ttInputBg.style.background = "none";
    ttInputBg.style.margin = 0;
    ttInputContainer.classList.add("border-tomtom");
    ttInput.setAttribute("name", "address");
    ttInput.setAttribute("required", "true");

    this.searchApartments();

    visitStore.getIpAddress();
  },
  methods: {
    searchApartments() {
      const searchBox = document.querySelector("input.tt-search-box-input");
      const city = searchBox.value;
      let radiusH = document.getElementById("radius");
      let radius = radiusH.value;
      let servicesH = document.getElementById("services");
      let services = servicesH.value;
      let roomsH = document.getElementById("rooms");
      let rooms = roomsH.value;
      let bedsH = document.getElementById("beds");
      let beds = bedsH.value;

      const url = `http://127.0.0.1:8000/api/properties?address=${city}&radius=${radius}&beds_min=${beds}&rooms=${rooms}&service_id=${services}`;
      axios
        .get(url)
        .then((res) => {
          // Gestisci la risposta dalla chiamata API
          console.log(res.data.results.data);
          this.properties = res.data.results.data;
        })
        .catch((error) => {
          // Gestisci eventuali errori
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  padding-right: 15px;
}
</style>
