import radnomWords from "random-words"


export default {
  name: 'typing',
  components: {},
  props: [],
  data () {
    return {
      typing_words: null,
      typing_words_left: null,

      /* Settings */
      typing_time: 60,
      number_of_words: 120,
      is_typing_started: false,
      typed_seconds: 0,
      current_word_index: 0,
      current_user_text: "",

      /* input text will be red when user typed incorrectly */
      is_current_input_correct: true,
      is_typing_finished: false,

      /* Saved statictics data - this data will be used in next component, to display user details about his typing */
      ssdata: {
        max_time: 0,
        typed_in: 0,
        max_words: 0,
        typed_words: 0,
        actions: 0,
        incorrectly_typed_words: 0,
        backspaces_pressed: 0,
        /* just a copy of this.typing_words */
        typing_words_list: 0,
      }
    }
  },
  computed: {
    current_word: function(){
      return this.typing_words[0]
    },
  },
  mounted () {

    this.init_typing({
      number_of_words: 120,
      number_of_seconds: 60,
    });

    this.$nextTick(function () {
    window.setInterval(() => {
        this.CountDown();
      },1000);
    })

    /* When settings form is submitted lets generate word list with given settings, and set time to given  */
    this.$root.$on('settings-submit', data => {
      this.init_typing(data)
    });
  },
  methods: {

    /* Function that inits or re-inits typing */
    init_typing: function(data){
      this.current_user_text = "";
      this.number_of_words =  data.number_of_words;
      this.typing_time = data.number_of_seconds;
      this.is_typing_finished = false;
      this.create_typing_words(data.number_of_words);
      /* Reseting ssdata */
      this.typed_seconds = 0;
      this.ssdata.actions = 0;
      this.backspaces_pressed = 0;
      this.ssdata.typing_words_list = this.typing_words;
      this.ssdata.max_words = this.typing_words.length;
      this.ssdata.incorrectly_typed_words = 0;
    },

    next_word: function(){
      this.ssdata.typed_words++;
      if(this.current_user_text){
        let real_user_input = this.current_user_text.slice(0, -1);

        if(real_user_input != this.current_word){
          this.ssdata.incorrectly_typed_words++;
        }
      }

      this.typing_words.shift();
      this.current_user_text = null;
      this.current_word_index++;
      this.is_current_input_correct = true;

      if(this.typing_words_left < 1){
        this.finish();
      }

    },

    TextOnchange: function(evt){

      if(!this.is_typing_started){
        this.is_typing_started=true;
      }

      if(this.is_typing_started){
        this.ssdata.actions++;

        if(evt){
          if(evt.code == "Space"){
            this.next_word();
          }else if(evt.key == "Backspace"){
            this.ssdata.backspaces_pressed++;
          }
        }

        let user_text_length = 0;
        if(this.current_user_text){
          user_text_length = this.current_user_text.length
        }

        let cut_current_word = this.current_word.substring(0, user_text_length);

        if(!this.current_user_text){
          this.is_current_input_correct = true;
        }else{
          if( this.current_user_text[this.current_user_text.length -1] == " " ){
            this.is_current_input_correct = true;
          }else{
            if(cut_current_word == this.current_user_text){
              this.is_current_input_correct = true;
            }else{
              this.is_current_input_correct = false;
            }
          }

        }
      }

    },

    /* If typing is started every second change timer number, and stop typing when time is gone */
    CountDown: function(){
      if(this.is_typing_started){
        this.typed_seconds++;
        if(this.typed_seconds >= this.typing_time){
          this.finish();
        }
      }
    },

    finish: function(){
      this.ssdata.max_time = this.typing_time;
      this.ssdata.typed_in = this.typed_seconds;

      this.is_typing_started = false;
      this.is_typing_finished = true;
      this.$root.$emit('typing-finished', this.ssdata);
    },

    create_typing_words: function(number_of_words){
      if(this.custom_text){
        this.typing_words = this.custom_text.split(" ");
      }else{
        this.typing_words = radnomWords(number_of_words)
      }
      this.typing_words_left = this.typing_words;
    }

  },


}
