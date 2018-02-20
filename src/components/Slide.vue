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
              idx: this.index,
              prevIdx: null,
              maxVisibleSlides: 3,
              styles: {},
          };
      },
      computed: {
          slideStyle() {
              return this.styles;
          }
      },

      created() {
          this.animate(this.index);
      },

      methods: {
          gotoSlide() {
              if (this.index === this.parent.currentSlide) {
                  return;
              }

              this.parent.goToSlide(this.idx);
          },

          setIndex(index) {
              let ctx = this;

              this.prevIdx = this.idx;

              if (this.prevIdx === 1 || index > this.prevIdx) {
                  this.moveToStartPosition();
              }

              this.idx = index;
              setTimeout(function () {
                  ctx.animate(index);
              }, 30);
          },

          animate(index) {
              let styles = this.calculateStyles(index),
                  speed = this.$parent.getSpeed();

              styles.transition = 'right ' + speed + 'ms ease-out,' +
                  'top ' + speed + 'ms ease-out,' +
                  'bottom ' + speed + 'ms ease-out';

              this.styles = styles;
          },

          moveToStartPosition() {
              this.styles = this.calculateStyles(this.maxVisibleSlides + 1);
          },

          calculateStyles(forIndex) {
              let padding = this.getPadding(),
                  maxZIndex = 99,
                  posRight = 0,
                  opacity = 1;

              posRight = padding * (this.maxVisibleSlides - forIndex);

              if (forIndex > this.maxVisibleSlides) {
                  opacity = 0;
              }

              return {
                  top: (forIndex - 1) * padding + 'px',
                  bottom: (forIndex - 1) * padding + 'px',
                  right: posRight + 'px',
                  opacity: opacity,
                  'z-index': maxZIndex - forIndex,
              };
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

              if (width < 578) {
                  return 10;
              }

              if (width < 992) {
                  return 20;
              }

              return 30;
          }
      }
  }
</script>
