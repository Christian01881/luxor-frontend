import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    apiURL: 'http://127.0.0.1:8000/api',
    imgBasePath: 'http://127.0.0.1:8000/storage/',


/****CHIAMATA PROPERTY* */
    getProperty(apiLink, myproperty) {
        store.loading = true;
        axios.get(apiLink).then((res) => {
            if (!myproperty || myproperty === undefined) {
                store.properties = res.data.results.data;
                store.links = res.data.results.links;
            }
            else {
                store.property = res.data.results;
            }

            store.loading = false;
            if (!res.data.success) {
                router.push({ name: '404-not-found' });
            }

        })
    },
    properties: [],
    links: [],
    loading: false,
    property: [],
    
});