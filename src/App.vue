

<template>
  <transition name="fade" mode="out-in">
    <div class="app-container">
      <header>
        <HeaderComponent />
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  </transition>
</template>


<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      
    }
  }
}
</script>
<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  flex: 0 0 auto;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}

main {
  flex: 1 0 auto;
  padding-top: 150px; /* Altezza dell'header */
  padding-bottom: 80px; 
}

footer {
  flex: 0 0 auto;
  /* position: fixed; */
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Titillium Web';
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>