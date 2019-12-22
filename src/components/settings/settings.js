export default {
  name: 'settings',
  data () {
    return {
      settings:{
        number_of_words: 120,
        number_of_seconds: 60,
      }
    }
  },
  methods: {
    scroll_to_typing: function(){
      this.$root.$emit('settings-submit', this.settings);
    }
  }
}
