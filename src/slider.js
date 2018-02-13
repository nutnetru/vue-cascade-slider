/**
 * Created by maximkou on 09.02.18.
 */

import Slider from './components/Slider.vue';
import Slide from'./components/Slide.vue';

const install = (Vue) => {
    Vue.component('cascade-slider', Slider);
    Vue.component('cascade-slider-slide', Slide);
};

export default {
    install
};