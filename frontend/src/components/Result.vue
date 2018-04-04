<template>
  <v-card fllat class='text-xs-center'>
    <img :src='src' alt='result' class='mt-3' />
    <v-card-text style='text-align:center' class="headline">{{result}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'results',
  data: () => ({
    src: null,
    result: null,
    /* Hardcore results data may be dynamic and can be loaded from api */
    fail: ['../../static/images/rugames/wrong-Answer-Image.png', 'Слабенько. Стыдно не знать историю своей страны в такое время'],
    success: ['../../static/images/rugames/right-Answer-Image.jpg', 'Да Вы знаток истории России!'],
    middle: ['../../static/images/rugames/middle-Answer-Image.jpeg', 'Что-то у Вас в голове определенно есть, но много и пробелов']
  }),
  mounted () {
    const rating = this.$store.state.resultMark
    if (rating === 'fail') {
      // плохой рез-т
      this.result = this.fail[1]
      this.src = this.fail[0]
    } else if (rating === 'success') {
      // отличный рез-т
      this.result = this.success[1]
      this.src = this.success[0]
    } else {
      // средний рез-т
      this.result = this.middle[1]
      this.src = this.middle[0]
    }
  }
}
</script>
