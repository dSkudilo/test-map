<template>
<!--  тут могла быть шапка -->
  <div class="main">
    <SimpleLoader v-if="isLoading"/>
    <router-view
      v-show="!isLoading"
    />
  </div>

<!--  а тут мог быть футер  -->
</template>
<script>
import SimpleLoader from '@/components/ui/SimpleLoader'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  components: { SimpleLoader },
  computed: {
    ...mapGetters('loader', ['isLoading'])
  },
  methods: {
    ...mapActions('loader', ['setLoading'])
  },
  mounted () {
  }
}
</script>
<style scoped>
.main {
  height: 100%;
}
</style>
