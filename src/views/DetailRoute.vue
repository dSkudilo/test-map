<template>
  <SimpleModal
    v-model="isOpen"
    :closeRoute="closeRoute"
    width="800px"
  >
    <div class="detail">
      <div class="detail-info">
        <div>
          <h4 class="detail-name">Название маршрута - {{route.Name || 'не указано'}}</h4>
          <div class="detail-description">
            Описание маршрута - {{route.Description || 'не указано'}}
          </div>
        </div>
        <SimpleButton @click="close">
          Назад
        </SimpleButton>
      </div>
      <div class="detail-table">
        <TableComponent
          :items="route.Stops"
          :column-defs="columnDefs"
          :getRowStyle="getRowStyle"
        />
      </div>
    </div>
  </SimpleModal>
</template>
<script>
import SimpleModal from '@/components/ui/SimpleModal'
import SimpleButton from '@/components/ui/SimpleButton'
import TableComponent from '@/components/ui/TableComponent'
import { stopsColumns } from '@/componentsConfigs/mainPage'
export default {
  name: 'DetailRoute',
  components: { TableComponent, SimpleButton, SimpleModal },
  data () {
    return {
      isOpen: true,
      closeRoute: {
        name: 'main'
      }
    }
  },
  computed: {
    columnDefs () {
      return stopsColumns
    },
    routeId () {
      return +this.$route.params.id
    },
    route () {
      return this.$store.getters['routes/route'](this.routeId) || {}
    }
  },
  methods: {
    close () {
      this.isOpen = false
      this.$router.push(this.closeRoute)
    },
    getRowStyle (params) {
      return params.node.data.Forward ? { color: 'blue' } : { color: 'red' }
    }
  }
}
</script>
<style scoped>
.detail {
  --table-width: 70%;

  display: flex;
  align-items: flex-start;
  gap: 20px;
  height: 80vh;
  overflow-y: auto;
}
.detail-info,.detail-table {
  height: 100%;
}
.detail-info {
  width: calc(100% - var(--table-width));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail-description {
  margin-top: 10px;
}
.detail-table {
  width: var(--table-width);
}
</style>
