<template>
  <div class=" card container p-5">
    <div v-if="success" class="alert alert-success text-start" role="alert">
            Messaggio inviato con successo!
        </div>
    <h1>Invia un messaggio al proprietario</h1>
    <form  @submit.prevent="sendMessage()" method="post">
      <div class="form-group">
        <label for="title">Titolo</label>
        <input
          type="text"
          v-model="title"
          id="title"
          name="title"
          class="form-control"
          autocomplete="none"
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
      <button class="btn btn-lg btn-primary text-white my-3" type="submit" :disabled="loading">{{ loading ? 'Send...' : 'Send'}}
     </button>
    </form>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      title: "",
      email: "",
      message: "",
      apiUrl: "http://127.0.0.1:8000/api/messages",
      loading: false,
      success: false,
      errors: {}
    };
  },
  methods: {
    sendMessage() {
        this.loading = true;
        const propertyId = this.$route.params.id;
      const messageData = {
        property_id: propertyId,
        title: this.title,
        email: this.email,
        message: this.message,
      };
      this.errors = {};
      axios.post(this.apiUrl, messageData).then((res) => {
        this.success = res.data.success;
                if (!this.success) {
                    this.errors = res.data.errors;
                } else {
                    // ripulisco i campi di input
                    this.title = '';
                    this.email = '';
                    this.message = '';
                }
                this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
