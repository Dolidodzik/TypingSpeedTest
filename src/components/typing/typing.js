import words from "../words.js"
console.log(words)

export default {
  name: 'typing',
  components: {},
  props: [],
  data () {
    return {
      /* Text passed from settings component */
      custom_text: "aoswjuiqariqw rqwrqworqwolr qwr qw rqw r qwr qw rqw rqwrqwrq wr qwr qw rqw r qwr qw rqw r qwr qw rqw qwrqwr",
      /* list of random words imported from /src/components/words.js */
      words: words,
      /* acctual words that user will type (provided by user using this.custom_text, or randomly generated using this.words) */
      typing_words: null,

      /* Settings */
      typing_time: 30,
      number_of_words: 50,
    }
  },
  computed: {

  },
  mounted () {

    /* Creating typing text from random words, if custom_text wasn't provided */
    if(this.custom_text){
      this.typing_words = this.custom_text.split(" ");
    }else{
      this.typing_words = [];
      for(let i=0; i < this.number_of_words; i++){
        let number_index = Math.floor(Math.random() * this.words.length);
        this.typing_words[i] = this.words[number_index];
      }
    }

  },
  methods: {
    
  }
}
