import Vue from 'vue';
import MyKeywords from "../components/MyKeywords.vue"
import MySelectfile from "../components/MySelectfile.vue"
import MySelectfileMulti from "../components/MySelectfileMulti.vue"
import MyCard from "../components/MyCard.vue"
//import vuePicturePreview from 'vue-picture-preview';

Vue.component('my-keywords', MyKeywords);
Vue.component('my-selectfile',MySelectfile)
Vue.component('my-selectfile-multi',MySelectfileMulti)
Vue.component('my-card',MyCard)
//Vue.component('Previewer', vuePicturePreview);