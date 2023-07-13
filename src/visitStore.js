import axios from 'axios';
import { reactive } from "vue";
// import router from './router/index';
import { useRoute } from 'vue-router'

export const visitStore = reactive ({

    apiView: 'http://127.0.0.1:8000/api/visits',
    ip_address: null,

    countView() {
        console.log(localStorage.getItem('ip_address'));
        const route = useRoute();
        axios.post(this.apiView, {
         property_slug: route.params.slug,
          ip_address: localStorage.getItem('ip_address'),
        })
          .then((response) => {
            console.log(response);
          });
      },

  getIpAddress() {
    
    if (!this.ip_address) {
      axios.get('https://api.ipify.org?format=json')
        .then((response) => {
          this.ip_address = response.data.ip;
          localStorage.setItem('ip_address', this.ip_address);
          console.log(this.ip_address);
        });
    }
  },
});
export default visitStore;
