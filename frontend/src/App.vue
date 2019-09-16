<template>
  <div id="app">
    <AppMenu />
    <router-view/>
  </div>
</template>

<script>
import AppMenu from './components/appMenu'
export default {
  name: 'app',
  components: {
   AppMenu
  }
}
</script>
