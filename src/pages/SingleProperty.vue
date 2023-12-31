<template>
  <Loading v-if="store.loading" />
  <div v-else class="card container property-details p-4">
    <h2>{{ store.property.title }}</h2>
    <span class=""><i class="fa-solid fa-location-dot text-primary pe-2 py-2"></i>{{ store.property.address }}</span> 
    <div class="row">
      <div class="col-md-6">
        <div class="image-container">
          <img
            :src="getImagePath(store.property.images[activeImageIndex].path)"
            alt="Property Image"
          />
          <div class="thumbnails">
            <img
              v-for="(image, index) in store.property.images"
              :key="image.id"
              :src="getImagePath(image.path)"
              alt="Thumbnail"
              @click="changeImage(index)"
              :class="{ active: index === activeImageIndex }"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <p class="py-2">{{ store.property.description }}</p>
        <div class="row">
          <div class="col-sm-6">
            <p class="border border-dark rounded-2 p-2">
              <span class="fw-bold">Camere:</span>
              {{ store.property.rooms }}
            </p>
          </div>
          <div class="col-sm-6">
            <p class="border border-dark rounded-2 p-2">
              <span class="fw-bold">Letti:</span> {{ store.property.beds }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <p class="border border-dark rounded-2 p-2">
              <span class="fw-bold">Bagni:</span>
              {{ store.property.bathrooms }}
            </p>
          </div>
          <div class="col-sm-6">
            <p class="border border-dark rounded-2 p-2">
              <span class="fw-bold">Metri quadri:</span>
              {{ store.property.square_meters }}
            </p>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-12">
            <p class="border border-1 rounded-2 p-2">
              <span class="fw-bold"><i class="fa-solid fa-location-dot text-primary"></i></span> {{ store.property.address }}
            </p>
          </div>
        </div> -->
        <div class="row">
          <div class="col-12">
            <h5 class="fw-bold">Gli ospiti vanno pazzi per...</h5>
            <div class="d-flex">
              <div
                class="card border border-dark me-3 p-1"
                v-for="service in store.property.services"
                :key="service.id"
              >
                {{ service.name }}
              </div>
            </div>
            <div class="d-flex pt-5 justify-content-between">
                  <div>
                      <a
                        class="btn2 btn btn-danger me-2"
                        @click="$router.push({ name: 'all-properties' })"
                        >Torna indietro</a>
                      <button class="btn btn-primary" @click="sendMessage">
                        Contatta proprietario
                      </button>
                </div>
                <div class="rating">
                  <span v-html="createRating({ rating: 4, total: 5 })"></span>
                </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../store";
import Loading from "../components/Loading.vue";
import { visitStore }  from "../visitStore"; 
import axios from "axios";

export default {
  name: "SingleProperty",
  components: {
    Loading,
  },
  data() {
    return {
      store,
      linkProperty: "http://localhost:8000/api/properties/",
      title: "",
      email: "",
      message: "",
      activeImageIndex: 0,
      apiUrl: "http://127.0.0.1:8000/api/messages",
    };
  },
  methods: {
    getImagePath(path) {
      return store.imgBasePath + path;
    },

    sendMessage() {
          const propertySlug = this.$route.params.slug;
          this.$router.push({ name: "create-message", params: { slug: propertySlug } });
    },

    changeImage(index) {
      this.activeImageIndex = index;
    },

    createRating({ 
      rating, 
      total, 
      starIcon = '<i class="fa-solid fa-star"></i>', 
      emptyIcon = '<i class="fa-regular fa-star"></i>' }) {
        
      const star = starIcon.repeat(rating);
      const empty = emptyIcon.repeat(total - rating);
      return star + empty;
    },
  },

  created() {
    const propertytSlug = this.$route.params.slug;
    store.getProperty(this.linkProperty + propertytSlug, true);

    visitStore.countView(this.$router);

  },
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  height: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.thumbnails {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(120, 52, 52, 0.5);
}

.thumbnails img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s;
}

.thumbnails img.active {
  opacity: 0.5;
}

.rating {
  color: gold;
  font-size: 20px;
  margin-top: 10px;
}

.rating i {
  margin-right: 5px;
}
</style>
