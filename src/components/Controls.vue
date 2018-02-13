<template>
    <div class="carousel-controls">
        <a href="#" v-for="num in slidesCount" v-bind:class="{ 'carousel-control': true, active: activeSlide == num + 1 }" @click="goToSlide(num+1)"></a>
    </div>
</template>

<script>
    export default {
        computed: {
            slidesCount() {
                if (!this.$parent.slides) {
                    return [];
                }

                return Array.from({length: this.$parent.slides.length}, (x,i) => i)
            },

            activeSlide() {
                return this.$parent.currentSlide;
            }
        },
        methods: {
            goToSlide(index) {
                let currentIndex = index;
                for (let k in this.$parent.slides) {
                    let slide = this.$parent.slides[k];

                    if (slide.index === index) {
                        currentIndex = slide.idx;
                        break;
                    }
                }

                this.$parent.goToSlide(currentIndex);
            }
        }
    }
</script>