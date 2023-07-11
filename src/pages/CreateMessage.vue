<template>
    <div class="container p-5">
      <h1>Invia un messaggio al proprietario</h1>
      <form action="" method="post">
        <div class="form-group">
          <label for="title">Titolo</label>
          <input type="text" v-model="title" id="title" name="title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" name="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="message">Messaggio</label>
          <textarea v-model="message" id="message" name="message" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary my-3" @click.prevent="sendMessage()">Invia Messaggio</button>
      </form>
    </div>
  </template>
  
  <script>
  
  import { store } from "../store";
  import axios from 'axios';

  export default {
    data() {
      return {
        store,
        title: '',
        email: '',
        message: '',
        apiUrl: 'http://127.0.0.1:8000/api/messages'
      };
    },
    methods: {
        sendMessage() {
            const propertySlug = this.$route.params.id;
            const messageData = {
                title: this.title,
                email: this.email,
                message: this.message
  };
    axios.post(this.apiUrl,  messageData)
    .then((res) => {
      console.log('Messaggio inviato con successo!');
      this.$router.push({ name: 'all-properties' });
    })
    
    }
  },
}
  </script>
  
  <style scoped>

  </style>
  