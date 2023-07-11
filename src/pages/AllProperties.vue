<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-6 mb-5" v-for="property in properties" :key="property.id">
                <div class="card h-100">
                    <img v-if="property.images.length > 0" :src="'http://127.0.0.1:8000/storage/' + property.images[0].path" alt="">
                    <img v-else src="https://www.leonardospada.it/wp-content/uploads/2022/09/errore-404-pagina-non-trovata-1024x576.jpg" alt="" class="h-100">
                    <div class="card-body">
                        <h4 class="fw-bold text-warning">
                            <router-link :to="{ name: 'single-property', params: { slug: property.slug } }">
                                {{ property.title }}
                            </router-link>
                        </h4>
                        <div class="row">
                            <div class="col-4">
                                <p><span class="fw-bold"><i class="fa-solid fa-bed"></i> Camere: </span>{{ property.rooms }}</p>
                            </div>
                            <div class="col-4">
                                <p><span class="fw-bold"><i class="fa-solid fa-sink"></i> Bagni: </span>{{ property.bathrooms }}</p>
                            </div>
                            <div class="col-4">
                                <p><span class="fw-bold"><i class="fa-solid fa-ruler-combined"></i> Metri quadri: </span>{{ property.square_meters }}</p>
                            </div>
                            <div class="col-6 text-center">
                                <p><span class="fw-bold"><i class="fa-solid fa-map-location"></i> Indirizzo: </span>{{ property.address }}</p>
                            </div>
                            <div class="col-6 text-center">
                                <p><span class="fw-bold"><i class="fa-solid fa-bell-concierge"></i> Servizi: </span><span v-for="service in property.services" class="me-2">{{ service.name }}</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    name: 'AllProperties',
    data() {
        return {
            store,
            properties: []
        };
    },
    methods: {
        getData() {
            axios.get(`${store.apiURL}/properties`).then((res) => {
                console.log(res.data.results.data);
                this.properties = res.data.results.data
            })
        }
    },
    mounted() {
        this.getData();
    }
}
</script>

<style lang="scss" scoped>
p {
    padding-right: 15px;
}
</style>