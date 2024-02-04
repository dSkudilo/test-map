<template>
  <SimplePlate class="table block-spacing">
    <TableComponent
      :items="items"
      :columnDefs="columnDefs"
      :getContextMenuItems="getContextMenuItems"
      @itemSelect="$emit('itemSelect', $event)"
      v-bind="$attrs"
    />
  </SimplePlate>
</template>
<script>
import SimplePlate from '@/components/ui/SimplePlate'
import TableComponent from '@/components/ui/TableComponent'
export default {
  name: 'TablePlate',
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    columnDefs: {
      type: Array,
      default: () => ([])
    },
    getContextMenuItems: {
      type: Function,
      default: () => ([])
    }
  },
  components: {
    TableComponent,
    SimplePlate
  }
}
</script>
<style scoped>
.table {
  height: 100%;
}
</style>
