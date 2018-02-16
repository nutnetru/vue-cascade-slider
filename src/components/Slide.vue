<template>
  <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" v-on:tap="gotoSlide" @click="gotoSlide" :style="slideStyle" class="carousel-slide">
    <slot></slot>
  </v-touch>
</template>

<script>
  export default {
      name: 'cascade-slider-slide',
      props: {
          index: {
              type: Number
          }
      },
      data() {
          return {
              parent: this.$parent,
              idx: this.index
          };
      },
      computed: {
          slideStyle() {
              let padding = this.getPadding(),
                  maxZIndex = 99,
                  maxVisibleSlides = 3,
                  posRight = 0,
                  opacity = 1;

              posRight = padding * (maxVisibleSlides - this.idx);

              if (this.idx > maxVisibleSlides) {
                  opacity = 0;
              }

              let styles = {
                  top: (this.idx - 1) * padding + 'px',
                  bottom: (this.idx - 1) * padding + 'px',
                  right: posRight + 'px',
                  opacity: opacity,
                  'z-index': maxZIndex - this.idx,
              };

              styles.transition = 'right 500ms, top 500ms, bottom 500ms, z-index 0ms, opacity 150ms';

              return styles;
          }
      },
      methods: {
          gotoSlide() {
            this.parent.goToSlide(this.idx);
          },

          setIndex(index) {
              this.idx = index;
          },

          onSwipeLeft() {
              let nextIdx = this.idx + 1;

              if (this.parent.slides.length < nextIdx) {
                  nextIdx = 1;
              }

              this.parent.goToSlide(nextIdx);
          },

          onSwipeRight() {
              let prevIdx = this.idx - 1;

              if (prevIdx < 1) {
                  prevIdx = this.parent.slides.length;
              }

              this.parent.goToSlide(prevIdx);
          },

          getPadding() {
              let width = window.innerWidth;

              if (width < 768) {
                  return 10;
              }

              if (width < 1200) {
                  return 20;
              }

              return 30;
          }
      }
  }
</script>
