<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary p-2">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand" style="font-family: 'Shadows Into Light', cursive; font-weight: bold; font-size: 34px;">LuxorBnB</router-link>
      <button class="navbar-toggler" type="button" @click="toggleNavbar" :class="{ 'collapsed': !isNavbarOpen }" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" :aria-expanded="isNavbarOpen ? 'true' : 'false'" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }">
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <li>
            <router-link :to="{ name: 'home' }" class="nav-link active" @click="hideNavbar">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'all-properties' }" class="nav-link" @click="hideNavbar">Proprietà</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'about-us' }" class="nav-link" @click="hideNavbar">Chi siamo</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'contact-us' }" class="nav-link" @click="hideNavbar">Contatti</router-link>
          </li>
        </ul>
        <div>
          <a class="btn btn-primary" href="http://localhost:8000/">Accedi</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
    return {
      isNavbarOpen: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    hideNavbar() {
      this.isNavbarOpen = false;
    },
  },
};

</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');


.nav {
  font-family: 'Titillium Web';
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
}

.nav * {
  box-sizing: border-box;
  transition: all .35s ease;
}

.nav li {
  display: inline-block;
  list-style: outside none none;
  margin: .5em 1em;
  padding: 0;
}

.nav a {
  padding: .5em .8em;
  color: rgba(7, 7, 7, 0.5);
  position: relative;
  text-decoration: none;
  font-size: 15px;
}

.nav a::before,
.nav a::after {
  content: '';
  height: 14px;
  width: 14px;
  position: absolute;
  transition: all .35s ease;
  opacity: 0;
}

.nav a::before {
  content: '';
  right: 0;
  top: 0;
  border-top: 3px solid #050505;
  border-right: 3px solid #060606;
  transform: translate(-100%, 50%);
}

.nav a:after {
  content: '';
  left: 0;
  bottom: 0;
  border-bottom: 3px solid #050505;
  border-left: 3px solid rgb(4, 4, 4);
  transform: translate(100%, -50%)
}

.nav a:hover:before,
.nav a:hover:after{
  transform: translate(0,0);
  opacity: 1;
}

.nav a:hover {
  color: #080808;
}

</style>
