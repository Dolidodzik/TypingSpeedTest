import words from "../words.js"
console.log(words)

export default {
  name: 'typing',
  components: {},
  props: [],
  data () {
    return {
      /* Text passed from settings component */
      custom_text: null,
      /* list of random words imported from /src/components/words.js */
      words: words,
      /* acctual words that user will type (provided by user using this.custom_text, or randomly generated using this.words) */
      typing_words: null,
      /* Typing words left, that will be shown in div with overflow: hidden */
      typing_words_left: null,

      /* Settings */
      typing_time: 30,
      number_of_words: 10,

      /* Current word index */
      current_word_index: 0,

      /* Current user input-text value */
      current_user_text: "",
    }
  },
  computed: {

    current_word: function(){
      return this.typing_words[this.current_word_index];
    }

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
    this.typing_words_left = this.typing_words;
  },
  methods: {

    /* This function will be called on space */
    next_word: function(){
      this.typing_words_left.pop();
      this.current_user_text = null;
      this.current_word_index++;
    },

    /* input-text onchange handler */
    TextOnchange: function(value){
      /* If user pressed space, lets go for next word */
      console.log("textonchage")
      if(value == " "){
        this.next_word();
      }
    }

  },
  watch: {
    current_user_text: function(value){
      this.TextOnchange(value)
    }
  }

}
