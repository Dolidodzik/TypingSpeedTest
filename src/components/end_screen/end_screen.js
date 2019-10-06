export default {
  name: 'end-screen',
  components: {

  },
  props: [],
  data () {
    return {
      ssdata: {

      }
    }
  },
  computed: {

  },
  mounted () {
    this.$root.$on('typing-finished', data => {
     console.log(data);
     this.ssdata = data;
    });
  },
  methods: {

  }
}
