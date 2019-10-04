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

      /* Saved statictics data - this data will be used in next component, to display user details about his typing */
      ssdata: {

        /* Time that user had to use for typing */
        max_time: 0,

        /* Time that user needed to complete typing */
        typed_in: 0,

        /* Number of words that user had to type */
        max_words: 0,

        /* Number of words that user had typed in time */
        typed_words: 0,

        /* Numbers of this.TextOnchange() triggers */
        actions: 0,

        /* number of incorrectly typed words  */
        incorrectly_typed_words: 0,

        /* Number of backspaces pressed */
        backspaces_pressed: 0,

        /* just a copy of this.typing_words */
        typing_words: 0,

      }

    }
  },
  computed: {

    current_word: function(){

      let cur_word = "";
      if(this.typing_words){
        cur_word = this.typing_words[this.current_word_index];
      }else{
        this.create_typing_words();
        cur_word = this.typing_words[this.current_word_index];
      }

      return cur_word;
    },

    /* This method creates styles for input */
    input_style: function(){
      return styles
    },

    /* Boolean that represents if user input is correct */
    is_current_input_correct: {

      get: function(){
        return true;
        let cut_current_word = this.current_word.substring(0, this.current_user_text.length);

        if(cut_current_word == this.current_user_text){
          return true;
        }else{
          return false;
        }
      },

      set: function(){

      }



    }

  },
  mounted () {

    /* Creating typing text from random words, if custom_text wasn't provided */
    this.create_typing_words();

    console.log(this.typing_words)

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
      this.is_current_input_correct = true;

      if(this.typing_words_left < 1){
        this.finish();
      }

    },

    /* input-text onchange handler */
    TextOnchange: function(evt){

      this.ssdata.actions++;

      let value;

      /* If key is not defined, it means user pressed space */
      if(evt){
        value = evt.key;
      }else{
        value = " ";
      }

      /* If user pressed space, lets go for next word */
      if(value == " "){
        this.next_word();
      }else if(value == "Backspace"){
        console.log("back")
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
    },

    create_typing_words: function(){
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
    }

  },
  watch: {
    current_user_text: function(value){
      this.TextOnchange(value)
    }
  }

}
