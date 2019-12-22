<template>
  <div id="app" class="container">

    <settings/>
    <typing/>
    <end_screen/>

  </div>
</template>

<script>

import settings from './components/settings/index.vue';
import typing from './components/typing/index.vue';
import end_screen from './components/end_screen/index.vue';

export default {
  name: 'app',
  components: {
    settings,
    typing,
    end_screen,
  },
  mounted () {
  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Heebo:400,500,700&display=swap');

body {
  text-align: center !important;
  color: #ccc !important;
  background-color: #1a1a1a !important;
  font-family: 'Heebo', sans-serif !important;
}
</style>
