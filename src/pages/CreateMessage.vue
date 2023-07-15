<template>
  <div class="card container p-5">
    <div v-if="success" class="alert alert-success text-start" role="alert">
      Messaggio inviato con successo!
    </div>
    <h3>Invia un messaggio al proprietario</h3>
    <form @submit.prevent="sendMessage()" method="post">
      <div class="form-group py-3">
        <label for="title" class="fw-bolder">Titolo</label>
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
        <label for="email" class="fw-bold">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          name="email"
          class="form-control"
          required
        />
      </div>
      <div class="form-group py-3">
        <label for="message" class="fw-bold">Messaggio</label>
        <textarea
          v-model="message"
          id="message"
          name="message"
          class="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" class="learn-more pe-2" :disabled="loading">
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text"> {{ loading ? "Invia..." : "Invia" }}</span>
      </button>
      <!-- <button
        class="btn btn-primary text-white my-3 me-2"
        type="submit"
        :disabled="loading"
      >
        {{ loading ? "Invia..." : "Invia" }}
      </button> -->
      <!-- <button class=" btn btn-danger my-3" @click="$router.push({ name: 'all-properties' })"></button> -->
      <button type="submit" class="learn-more" @click="$router.push({ name: 'single-property' })">
          <span class="circle" aria-hidden="true">
            <span class="icon arrow"></span>
          </span>
          <span class="button-text"> Torna indietro</span>
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
      errors: {},
    };
  },
  methods: {
    sendMessage() {
  this.loading = true;
  const propertySlug = this.$route.params.slug; 
  const messageData = {
    property_slug: propertySlug, 
    title: this.title,
    email: this.email,
    message: this.message,
  };
  this.errors = {};
  axios.post(`${this.apiUrl}/${propertySlug}`, messageData) 
    .then((res) => {
      this.success = res.data.success;
      if (!this.success) {
        this.errors = res.data.errors;
      } else {
        // Ripulisco i campi di input
        this.title = "";
        this.email = "";
        this.message = "";
      }
      this.loading = false;
    })
    .catch((error) => {
      console.log(error);
      this.loading = false;
    });
},
  },
  
  mounted() {
    this.title = store.property.title;
  },
};
</script>

<style lang="scss" scoped>
// @use "../assets/styles/partials/variables" as *;

@import url('https://fonts.googleapis.com/css?family=Mukta:700');

$bg: #f3f8fa;
$white: #fff;
$black: #282936;

@mixin transition($property: all, $duration: 0.45s, $ease: cubic-bezier(0.65,0,.076,1)) {
  transition: $property $duration $ease;
}

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}

body {
  font-family: 'Mukta', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: $bg;
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  &.learn-more {
    width: 12rem;
    height: auto;
    .circle {
      @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
      position: relative;
      display: block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: $black;
      border-radius: 1.625rem;
      .icon {
        @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: $white;
        &.arrow {
          @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
          &::before {
            position: absolute;
            content: '';
            top: -0.25rem;
            right: 0.0625rem;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid #fff;
            border-right: 0.125rem solid #fff;
            transform: rotate(45deg);
          }
        }
      }
    }
    .button-text {
      @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.75rem 0;
      margin: 0 0 0 1.85rem;
      color: $black;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
  }
  &:hover {
    .circle {
      width: 100%;
      .icon {
        &.arrow {
        background: $white;
        transform: translate(1rem, 0);
        }
      }
    }
    .button-text {
      color: $white;
    }
  }
}

@supports (display: grid) {
  body {
    display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.625rem;
  grid-template-areas: ". main main ." ". main main .";
  }
  
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }
}

</style>
