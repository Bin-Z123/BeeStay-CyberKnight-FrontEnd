import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "keen-slider/keen-slider.min.css";
import 'aos/dist/aos.css'
import AOS from 'aos'


const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);
app.use(createPinia());
app.use(router);
app.use(
    VueQueryPlugin, {
    enableDevtoolsV6Plugin: true
}
)
app.mount("#app");
// ..

AOS.init({
    duration: 1000,
    // once: true,
    // easing: 'ease-in-out',
});