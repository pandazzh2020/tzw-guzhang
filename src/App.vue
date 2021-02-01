<template>
  <div id="app">
	<router-view></router-view>
  </div>
</template>

<script>
import index from './components/index.vue'

export default {
  name: 'App',
  components: {
    'index': index
  }
}
</script>

<style>
#app {
   height: 100%;
}
</style>
