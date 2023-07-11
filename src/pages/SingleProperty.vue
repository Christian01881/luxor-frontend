<template>
  <Loading v-if="store.loading" />
  <div v-else class="card container" style="width: 50rem;">
 
    <h2>{{ store.property.title }}</h2>
    <ul>
        <li v-for="image in store.property.images" :key="image.id">
        <img :src="getImagePath(image.path)" alt="Property Image">
      </li>
    </ul>
    <p>{{ store.property.description }}</p>
    <ul>
      <li>Rooms: {{ store.property.rooms }}</li>
      <li>Beds: {{ store.property.beds }}</li>
      <li>Bathrooms: {{ store.property.bathrooms }}</li>
      <li>Square Meters: {{ store.property.square_meters }}</li>
      <li>Address: {{ store.property.address }}</li>
    </ul>
      
    <div class="project-body">
      <div class="container">
        <h3>Services:</h3>
    <ul>
      <li v-for="service in store.property.services" :key="service.id">{{ service.name }}</li>
    </ul>
    <a class="btn2 btn btn-danger"><router-link class="nav-link" :to="{ name: 'all-properties' }">Go to back</router-link></a>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../store";
import Loading from "../components/Loading.vue";


export default {
  name: "SingleProperty",
  components: {
    Loading,
   
  },
  data() {
    return {
      store,
      linkProperty: "http://localhost:8000/api/properties/",
    };
  },
  methods: {
    getImagePath(path) {
      return store.imgBasePath + path;
    },
  },
  created() {
    const propertytSlug = this.$route.params.slug;
    store.getProperty(this.linkProperty + propertytSlug, true);
  },
};
</script>

<style lang="scss" scoped>

</style>
