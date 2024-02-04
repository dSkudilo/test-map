<template>
  <ag-grid-vue
    v-if="columnDefs.length > 0"
    class="ag-theme-quartz table-content"
    :columnDefs="columnDefs"
    :rowData="items"
    @rowClicked="$emit('itemSelect', $event)"
    :getContextMenuItems="getContextMenuItems"
    v-bind="$attrs"
  >
  </ag-grid-vue>
</template>
<script>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import 'ag-grid-enterprise'
import { AgGridVue } from 'ag-grid-vue'
export default {
  name: 'TableComponent',
  components: {
    AgGridVue
  },
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
  }
}
</script>
<style scoped>
.table-content {
  height: inherit;
}
</style>
