export default {
  name: 'settings',
  components: {},
  props: [],
  data () {
    return {

      settings:{

        /* Defult values */
        number_of_words: 10,
        number_of_seconds: 60,

      }

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

    scroll_to_typing: function(){
      this.$root.$emit('settings-submit', this.settings);
    }

  }
}
