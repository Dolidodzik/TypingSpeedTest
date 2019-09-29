<template>
  <div id="app" class="container">

    <settings/>
    <typing/>

  </div>
</template>

<script>

import settings from './components/settings/index.vue';
import typing from './components/typing/index.vue';

export default {
  name: 'app',
  components: {
    settings,
    typing
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Heebo:400,500,700&display=swap');

body {
  text-align: center !important;
  color: #ccc !important;
  background-color: #1a1a1a !important;
  font-family: 'Heebo', sans-serif !important;
  padding-bottom: 1150px;
}
</style>
