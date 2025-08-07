import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "keen-slider/keen-slider.min.css";

import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, {
});
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
});

app.mount("#app");
