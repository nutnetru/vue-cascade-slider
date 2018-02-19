<template>
  <div class="carousel" :style="sliderStyles" v-images-loaded="showSlider" v-cloak>
    <div class="carousel-slider">
      <slot></slot>
    </div>

    <Controls></Controls>
  </div>
</template>

<script>
import Controls from './Controls.vue';
import imagesLoaded from 'vue-images-loaded';

export default {
    components: {
      Controls
    },
    directives: {
        imagesLoaded
    },
    props: {
        speed: {
            type: Number
        }
    },
    computed: {
        sliderStyles() {
            return {
                display: this.visible ? 'block' : 'none'
            };
        }
    },
    data(){
        return {
            slides: null,
            currentSlide: 1,
            visible: false
        };
    },
    methods: {
        goToSlide(index) {
            for (let k in this.slides) {
                let slide = this.slides[k],
                  newIndex = slide.idx - (index - 1);

                if (newIndex <= 0) {
                    newIndex = this.slides.length + newIndex;
                }

                if (newIndex === 1) {
                    this.currentSlide = slide.index;
                }
                
                slide.setIndex(newIndex);
            }
        },

        getSpeed() {
            return this.speed || 500;
        },

        showSlider() {
            console.log(1);
            this.visible = true;
        }
    },
    mounted() {
        this.slides = this.$children.filter(child => {
            return child.$options.name === "cascade-slider-slide";
        });
    }
}
</script>
