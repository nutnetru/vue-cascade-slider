<template>
  <div class="carousel">
    <div class="carousel-slider">
      <slot></slot>
    </div>

    <Controls></Controls>
  </div>
</template>

<script>
import Controls from './Controls.vue'

export default {
    components: {
      Controls
    },
    data(){
        return {
            slides: null,
            currentSlide: 1,
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
    },
    mounted() {
        this.slides = this.$children.filter(child => {
            return child.$options.name === "cascade-slider-slide";
        });
    }
}
</script>
