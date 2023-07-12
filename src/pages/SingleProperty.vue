<template>
  <Loading v-if="store.loading" />
  <div v-else class="card container property-details">
    <h2>{{ store.property.title }}</h2>
    <div class="image-container">
      <img :src="getImagePath(store.property.images[activeImageIndex].path)" alt="Property Image" />
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
    <p>{{ store.property.description }}</p>
    <div>
      <p>Rooms: {{ store.property.rooms }}</p>
      <p>Beds: {{ store.property.beds }}</p>
      <p>Bathrooms: {{ store.property.bathrooms }}</p>
      <p>Square Meters: {{ store.property.square_meters }}</p>
      <p>Address: {{ store.property.address }}</p>
    </div>

    <div class="project-body">
      <div class="container">
        <h3>Services:</h3>
        <ul>
          <li v-for="service in store.property.services" :key="service.id">
            {{ service.name }}
          </li>
        </ul>
        <a class="btn2 btn btn-danger" @click="$router.push({ name: 'all-properties' })">Go back</a>
        <button class="btn btn-primary" @click="sendMessage">Send Message</button>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../store";
import Loading from "../components/Loading.vue";
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
      const propertyId = this.store.property.id;
      this.$router.push({ name: "create-message", params: { id: propertyId } });
    },
    changeImage(index) {
      this.activeImageIndex = index;
    },

   },
    created() {
    const propertytSlug = this.$route.params.id;
    store.getProperty(this.linkProperty + propertytSlug, true);
   },
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  height: 300px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit:fill;
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
</style>






