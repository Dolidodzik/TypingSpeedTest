export default {
  name: 'end-screen',
  components: {

  },
  props: [],
  data () {
    return {
      ssdata: {

      },
      /* Boolean marked as true if user finished typing at least once. Only if equals to true results can be displayed */
      typing_finished_at_least_once: false,
      correctly_typed_words: 0,
    }
  },
  computed: {

  },
  mounted () {
    this.$root.$on('typing-finished', data => {
     console.log(data);
     this.ssdata = data;
     this.typing_finished_at_least_once = true;
     this.correctly_typed_words = data.typed_words - data.incorrectly_typed_words;
    });
  },
  methods: {

  }
}
