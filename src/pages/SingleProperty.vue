<template>
  <Loading v-if="store.loading" />
  <div v-else class="card container" style="width: 50rem">
    <h2>{{ store.property.title }}</h2>
    <ul>
      <li v-for="image in store.property.images" :key="image.id">
        <img :src="getImagePath(image.path)" alt="Property Image" />
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
          <li v-for="service in store.property.services" :key="service.id">
            {{ service.name }}
          </li>
        </ul>
        <a class="btn2 btn btn-danger"
          ><router-link class="nav-link" :to="{ name: 'all-properties' }"
            >Go to back</router-link
          ></a
        >
        <button class="btn btn-primary" @click="sendMessage">
          Invia un messaggio al proprietario
        </button>
      </div>
    </div>
  </div>
  <form action="" method="post">
    <div class="form-group">
      <label for="title">Titolo</label>
      <input
        type="text"
        v-model="title"
        id="title"
        name="title"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        v-model="email"
        id="email"
        name="email"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="message">Messaggio</label>
      <textarea
        v-model="message"
        id="message"
        name="message"
        class="form-control"
        required
      ></textarea>
    </div>
    <button
      type="submit"
      class="btn btn-primary my-3"
      @click.prevent="sendMessage()"
    >
      Invia Messaggio
    </button>
  </form>
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
      id: store.property.id,
      apiUrl: "http://127.0.0.1:8000/api/messages",
    };
  },
  methods: {
    getImagePath(path) {
      return store.imgBasePath + path;
    },

    // sendMessage() {
    //   const propertyId = this.store.property.id;
    //   this.$router.push({ name: "create-message", params: { id: propertyId } });
    // },

    sendMessage() {
      const propertySlug = this.$route.params.id;
      const messageData = {
        title: this.title,
        email: this.email,
        message: this.message,
        id: this.id,
      };
      axios.post(this.apiUrl, messageData).then((res) => {
        console.log(res.data);
        // this.$router.push({ name: "all-properties" });
      });
    },
  },
  created() {
    const propertytSlug = this.$route.params.slug;
    store.getProperty(this.linkProperty + propertytSlug, true);
  },
};
</script>

<style lang="scss" scoped></style>
