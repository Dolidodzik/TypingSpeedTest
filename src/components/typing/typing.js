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
      number_of_words: 50,
      is_typing_started: false,
      typed_seconds: 0,

      /* Current word index */
      current_word_index: 0,

      /* Current user input-text value */
      current_user_text: "",

    }
  },
  computed: {

    current_word: function(){
      return this.typing_words[this.current_word_index];
    },

    /* This method creates styles for input */
    input_style: function(){

      return styles
    },

    /* Boolean that represents if user input is correct */
    is_current_input_correct: function(){

      let cut_current_word = this.current_word.substring(0, this.current_user_text.length);

      if(cut_current_word == this.current_user_text){
        return true;
      }else{
        return false;
      }

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

    /* Starting timer */
    this.$nextTick(function () {
    window.setInterval(() => {
        this.CountDown();
      },1000);
    })
  },
  methods: {

    /* This function will be called on space */
    next_word: function(){
      this.typing_words_left.pop();
      this.current_user_text = null;
      this.current_word_index++;
      this.is_current_input_correct = false;
    },

    /* input-text onchange handler */
    TextOnchange: function(value){
      /* If user pressed space, lets go for next word */
      if(value == " "){
        this.next_word();
      }else{
        console.log(value)
      }
    },

    /* If typing is started every second change timer number, and stop typing when time is gone */
    CountDown: function(){
      if(this.is_typing_started){
        this.typed_seconds++;
        if(typed_seconds > this.typing_time){
          this.finish();
        }
      }
    },

    /* Function called when typing finished (when time is gone, or all of the text was typed) */
    finish: function(){
      console.log("FINISHING")
    }

  },
  watch: {
    current_user_text: function(value){
      this.TextOnchange(value)
    }
  }

}
