<template>
  <img
    id="scrollup"
    alt="Scroll up"
    src="../../static/up.svg"
    :class="scrollUpClass"
    @mouseover='onMouseOver'
    @mouseout='onMouseOut'
    @click="goTop"
    title="Back to top"
  />
</template>

<script>
export default {
  name: 'scrollUp',
  data: () => ({
    scrollUp: null,
    classActive: false
  }),
  mounted () {
    this.scrollUp = document.getElementById('scrollup')
    window.addEventListener('scroll', this.scrollListener)
  },
  computed: {
    scrollUpClass () {
      return this.classActive ? 'active' : 'non-active'
    }
  },
  methods: {
    goTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    onMouseOver () {
      this.scrollUp.style.opacity = 0.99
      this.scrollUp.style.filter = 'alpha(opacity=30)'
    },
    onMouseOut () {
      this.scrollUp.style.opacity = 0.65
      this.scrollUp.style.filter = `alpha(opacity=50)`
    },
    scrollListener () {
      if (window.pageYOffset > 0) {
        this.classActive = true
      } else this.classActive = false
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>

<style scoped>
#scrollup {
  position: fixed;
  opacity: 0.65;
  border-radius: 5px;
  left: 5px;
  bottom: 5px;
  cursor: pointer;
  z-index: 9999;
  max-width: 50px;
}

.non-active {
  display: none;
}

.active {
  display: block;
}

@media only screen and (max-width: 570px){
  #scrollup {
    padding: 0;
    left: 3px;
    bottom: 3px;
    max-width: 35px;
  }
}
</style>