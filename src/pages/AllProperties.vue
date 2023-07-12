<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-6 mb-5" v-for="property in properties" :key="property.id">

                <div class="card h-100">
                    <img v-if="property.images.length > 0" :src=" 'http://127.0.0.1:8000/storage/' + property.images[0].path" alt="">
                    <div class="card-body">
                        <h4 class="fw-bold text-warning">
                            <router-link :to="{ name: 'single-property', params: { id: property.id } }">
                                {{ property.title }}
                            </router-link></h4>
                        <div class="d-flex">
                        <p><span class="fw-bold">Camere: </span>{{ property.rooms }}</p>
                        <p><span class="fw-bold">Letti: </span>{{ property.beds }}</p>
                        <p><span class="fw-bold">Bagni: </span>{{ property.bathrooms }}</p>
                        <p><span class="fw-bold">Metri quadri: </span>{{ property.square_meters }}</p>
                        <!-- <p><span class="fw-bold">Indirizzo: </span>{{ property.address }}</p> -->
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
                // console.log(res.data.results.data);
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
main{
    background-color: black;
}
p {
    padding-right: 15px;
}
</style>