<template>
  <div class="main">
    <div class="main-sidebar">
      <ButtonsPlate
        :btnList="buttons"
        v-model="selectedBtn"
        @btnClick="clearCurrentStop"
      />
      <TablePlate
        :items="currentsList"
        :column-defs="currentColumnDefs"
        @itemSelect="selectItem"
        :getContextMenuItems="getContextMenuItems"
        :overlayNoRowsTemplate="emptyMessage"

      />
    </div>
    <div class="main-content">
      <MapPlate
        :route="currentRoute"
        :stop-list="selectedStops"
        :is-route-show="isRoutesSelected"
      />
    </div>
    <router-view/>
  </div>
</template>
<script>
import TablePlate from '@/components/blocks/TablePlate'
import MapPlate from '@/components/blocks/MapPlate'
import { mapActions, mapGetters } from 'vuex'
import ButtonsPlate from '@/components/blocks/ButtonsPlate'
import { btnList, tableColumnsConf } from '@/componentsConfigs/mainPage'
export default {
  name: 'MainPage',
  components: {
    ButtonsPlate,
    MapPlate,
    TablePlate
  },
  data () {
    return {
      buttons: btnList,
      selectedBtn: {},
      currentRoute: {},
      currentStop: {}
    }
  },
  computed: {
    emptyMessage () {
      return this.isRoutesSelected
        ? 'Маршруты не найдены'
        : Object.keys(this.currentRoute).length > 0
          ? 'Остановки не найдены'
          : 'Необходимо выбрать маршрут'
    },
    currentColumnDefs () {
      if (!this.selectedBtn.value) return
      return tableColumnsConf[`${this.selectedBtn.value}Columns`]
    },
    stops () {
      return this.currentRoute.Stops || []
    },
    isRoutesSelected () {
      return this.selectedBtn.value === this.buttons[0].value
    },
    currentsList () {
      return this.isRoutesSelected
        ? this.routes
        : this.stops
    },
    selectedStops () {
      return Object.keys(this.currentStop).length > 0 ? [this.currentStop] : this.stops
    },
    ...mapGetters('routes', ['routes'])
  },
  methods: {
    getContextMenuItems (params) {
      if (!params?.node?.data || typeof params.node.data.Stops === 'undefined') return
      const result = [
        {
          name: 'Подробнo',
          action: () => {
            this.$router.push({
              name: 'detailRoute',
              params: {
                id: params.node.data.ID
              }
            })
          }
        }
      ]
      return result
    },
    clearCurrentStop () {
      this.currentStop = {}
    },
    selectItem (val) {
      this.isRoutesSelected
        ? this.currentRoute = val.data
        : this.currentStop = val.data
    },
    async getData () {
      try {
        this.setLoading(true)
        await this.getRoutes()
      } catch (e) {
        console.error(e)
      } finally {
        this.setLoading(false)
      }
    },
    ...mapActions('loader', ['setLoading']),
    ...mapActions('routes', ['getRoutes'])
  },
  beforeMount () {
    this.selectedBtn = this.buttons[0]
  },
  async mounted () {
    await this.getData()
  }
}
</script>
<style scoped>
.main {
  --side-width: 30%;

  width: 100%;
  display: flex;
}
.main-sidebar {
  width: var(--side-width);
  display: flex;
  flex-direction: column;
}
.main-content {
  width: calc(100% - var(--side-width));
}
</style>
