<template>
  <div id="app" class="app">
    <component :is="layout + '-layout'" />
  </div>
</template>
<script>
import MainLayout from '@/layouts/MainLayout'
export default {
  components: { MainLayout },
  computed: {
    layout () {
      return this.$route.meta.layout || 'main'
    }
  }
}
</script>
<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
