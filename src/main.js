import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "keen-slider/keen-slider.min.css";

const app = createApp(App);

app.component("VueDatePicker", VueDatePicker);
app.use(createPinia());
app.use(router);
app.mount("#app");
