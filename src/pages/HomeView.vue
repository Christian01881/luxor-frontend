<template>
  <div class="container py-5">
    <h1 class="text-white" style="font-size: 5em;">Trova l'alloggio che fa per te</h1>
    <p class="text-white" style="font-size: 2em;">Cerca offerte su appartamenti, case e tanto altro...</p>
  </div>
  <div class="container-fluid container-carousel">
    <carousel
      :autoplay="3000"
      :items-to-show="2.5"
      :wrap-around="true"
      :transition="500"
      class="mt-5"
    >
      <slide v-for="property in propertiesWithOffers" :key="property.id">
        <div class="card border-0 m-2 h-100 carousel__item">
          <img
            :src="`http://127.0.0.1:8000/storage/${property.images[0].path}`"
            alt=""
            class="card-img"
            v-if="property.images.length > 0"
          />
          <img
            src="https://www.leonardospada.it/wp-content/uploads/2022/09/errore-404-pagina-non-trovata-1024x576.jpg"
            alt="Immagine-non-trovata"
            class="h-100"
            v-else
          />
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="fw-bold text-warning">
              <router-link
                :to="{
                  name: 'single-property',
                  params: { slug: property.slug },
                }"
              >
                {{ property.title }}
              </router-link>
            </h5>
            <div>
              <div class="d-flex flex-wrap">
                <div class="col-6 col-lg-4">
                  <p class="mb-0">
                    <span class="fw-bold"
                      ><i class="fa-brands fa-houzz"></i> Camere:
                    </span>
                    {{ property.rooms }}
                  </p>
                </div>
                <div class="col-6 col-lg-4">
                  <p class="mb-0">
                    <span class="fw-bold"
                      ><i class="fa-solid fa-bed"></i> Letti:
                    </span>
                    {{ property.beds }}
                  </p>
                </div>
                <div class="col-12 col-lg-4">
                  <p class="mb-0">
                    <span class="fw-bold"
                      ><i class="fa-solid fa-location-dot"></i> Indirizzo:
                    </span>
                    {{ property.address }}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-uppercase">
              <div
                class="d-flex flex-wrap justify-content-around py-3"
                v-for="(offer, index) in property.offers"
                :key="offer.id"
              >
                <p class="d-flex p-2 badge bg-primary mb-2">
                  <span class="fw-bold pe-1">Pacchetto:</span>
                  <span class="text-warning">{{ offer.name }}</span>
                </p>
                <p class="d-flex p-2 badge bg-primary mb-2">
                  <span class="fw-bold pe-1">In evidenza per:</span>
                  <span class="text-warning">{{ offer.duration }} ore</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      properties: [],
      offers: [],
    };
  },
  computed: {
    propertiesWithOffers() {
      return this.properties.filter((property) => property.offers.length > 0);
    },
  },
  mounted() {
    this.fetchProperties();
  },
  methods: {
    fetchProperties() {
      const url = "http://127.0.0.1:8000/api/properties";
      axios
        .get(url)
        .then((res) => {
          this.properties = res.data.results.data;
          this.fetchOffers();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchOffers() {
      const url = "http://127.0.0.1:8000/api/offers";
      axios
        .get(url)
        .then((res) => {
          this.offers = res.data.offers;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
