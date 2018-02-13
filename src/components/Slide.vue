<template>
  <div :style="slideStyle" @click="gotoSlide()" class="carousel-slide">
    <slot></slot>
  </div>
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
              let padding = 30,
                  maxZIndex = 99,
                  maxVisibleSlides = 3,
                  posRight = 0;

              if (this.idx < maxVisibleSlides) {
                  posRight = padding * (maxVisibleSlides - this.idx);
              }

              let styles = {
                  top: (this.idx - 1) * padding + 'px',
                  bottom: (this.idx - 1) * padding + 'px',
                  right: posRight + 'px',
                  'z-index': maxZIndex - this.idx,
              };

              styles.transition = 'right 500ms, top 500ms, bottom 500ms, z-index 0ms';

              return styles;
          }
      },
      methods: {
          gotoSlide() {
            this.parent.goToSlide(this.idx);
          },

          setIndex: function (index) {
              this.idx = index;
          }
      }
  }
</script>
