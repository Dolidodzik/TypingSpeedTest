export default {
  name: 'end-screen',
  data () {
    return {
      ssdata: {},
      typing_finished_at_least_once: false,
      correctly_typed_words: 0,
    }
  },
  mounted () {
    this.$root.$on('typing-finished', data => {
     this.ssdata = data;
     this.typing_finished_at_least_once = true;
     this.correctly_typed_words = data.typed_words - data.incorrectly_typed_words;
    });
  },
}
