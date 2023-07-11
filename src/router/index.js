import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import searchBar from '../pages/testSearchBar.vue'
import AllProperties from '../pages/AllProperties.vue'
import SingleProperty from '../pages/SingleProperty.vue'
import AboutUs from '../pages/AboutUs.vue'
import NotFound from '../pages/NotFound.vue'
import ContactUs from '../pages/ContactUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/properties',
      name: 'all-properties',
      component: AllProperties
    },
    {
      path: '/properties/:slug',
      name: 'single-property',
      component: SingleProperty
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs

    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404-not-found',
      component: NotFound
    },
    {
      path: '/searchbar',
      name: 'searchBar',
      component: searchBar

    }
  ]
})
export default router