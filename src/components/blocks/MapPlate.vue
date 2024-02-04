<template>
  <SimplePlate class="map">
    <l-map
      ref="map"
      class="map-l"
      :zoom.sync="zoom"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer
        :url="url"
      />

      <l-marker
        v-for="(stop,id) in stops"
        :key="`${id}-${stop.RouteID}`"
        :lat-lng="[stop.Lat, stop.Lon]"
        :icon="stop.Forward ? forwardIcon : stopIcon"
      >
        <l-tooltip>{{stop.Name}}</l-tooltip>
      </l-marker>

      <div v-if="isRouteShow && coordsObj.points?.length > 0">
        <l-polyline
          v-for="(obj,id) in coordsObj.points"
          :key="`${id}-${obj.id}`"
          :lat-lngs="[obj.start, obj.end]"
          :color="obj.isForward ? 'blue' : 'red'"
        >
          <l-tooltip>{{route.Name}}</l-tooltip>
        </l-polyline>
      </div>

    </l-map>
  </SimplePlate>
</template>
<script>
import { latLng, icon } from 'leaflet'
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline, LTooltip
} from 'vue2-leaflet'
import SimplePlate from '@/components/ui/SimplePlate'
import forwardMarker from '@/assets/images/forwardMarker.svg'
import stopdMarker from '@/assets/images/stopMarker.svg'
export default {
  name: 'MapPlate',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LTooltip,
    SimplePlate
  },
  props: {
    route: {
      type: Object,
      default: () => ({})
    },
    isRouteShow: {
      type: Boolean,
      default: false
    },
    stopList: {
      type: Array,
      default: () => ([])
    },
    stop: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      zoom: 14,
      bounds: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      marker: latLng(47.41322, -1.219482),
      stars: [
        { name: 'Sol', lng: -1.219482, lat: 47.41322 },
        { name: 'Mizar', lng: 41.6, lat: 130.1 },
        { name: 'Krueger-Z', lng: 13.4, lat: 56.5 },
        { name: 'Deneb', lng: 218.7, lat: 8.3 }
      ],

      forwardIcon: icon({
        iconUrl: forwardMarker,
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      }),

      stopIcon: icon({
        iconUrl: stopdMarker,
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    }
  },
  computed: {
    coordsObj () {
      // peaks и points определяю в 1 объект тк не хочу 2 раза бегать по массиву
      if (!this.route?.Points || this.route?.Points.length <= 0) {
        return {
          points: [],
          peaks: {
            greatestLat: null,
            greatestLon: null,
            lessLat: null,
            lessLon: null
          }
        }
      }
      const arr = this.route.Points
      return arr.reduce((acc, e, i) => {
        if (i <= arr.length - 2) {
          // 0.0001 и 0.00001 это значения смещения линийчтобы они шли рядом
          // использую это тк не нашел способо сделать смещение через библиотеку
          // в сети есть библиотека для polyline-offset но тк ее нету в тз то использую этот метод
          acc.points.push({
            start: [e.Forward ? arr[i].Lat : arr[i].Lat + 0.0001, e.Forward ? arr[i].Lon : arr[i].Lon + 0.00001],
            end: [e.Forward ? arr[i + 1].Lat : arr[i + 1].Lat + 0.0001, e.Forward ? arr[i + 1].Lon : arr[i + 1].Lon + 0.00001],
            isForward: e.Forward
          })
        }
        // определяю самые крайние координаты
        acc.lessLat = acc.lessLat < e.Lat ? acc.lessLat : e.Lat
        acc.lessLon = acc.lessLon < e.Lon ? acc.lessLon : e.Lon
        acc.greatestLat = acc.greatestLat > e.Lat ? acc.greatestLat : e.Lat
        acc.greatestLon = acc.greatestLon > e.Lon ? acc.greatestLon : e.Lon
        return acc
      }, {
        points: [],
        peaks: {
          greatestLat: null,
          greatestLon: null,
          lessLat: null,
          lessLon: null
        }
      })
    },
    stops () {
      return this.isRouteShow ? this.route.Stops : this.stopList
    }
  },
  methods: {
    boundsUpdated  (bounds) {
      this.bounds = bounds
    },
    boundsRoute () {
      const compare = !this.coordsObj.lessLat || !this.coordsObj.lessLon || !this.coordsObj.greatestLat || !this.coordsObj.greatestLon
      if (compare) return
      this.$refs.map.fitBounds([[this.coordsObj.lessLat, this.coordsObj.lessLon], [this.coordsObj.greatestLat, this.coordsObj.greatestLon]])
    }
  },

  watch: {
    coordsObj: {
      handler: function () {
        this.boundsRoute()
      },
      deep: true
    },
    isRouteShow: {
      handler: function (val) {
        if (val && Object.keys(this.route).length > 0) {
          this.boundsRoute()
        }
      },
      deep: true
    },
    stops: {
      handler: function (val) {
        if (val?.length !== 1) return
        const item = val[0]
        this.$refs.map.fitBounds([[item.Lat, item.Lon], [item.Lat, item.Lon]])
      },
      deep: true
    }
  }
}
</script>
<style>
.leaflet-bottom.leaflet-right {
  display: none;
}
</style>
<style scoped>
.map {
  height: 100vh;
}
.map-l {
  overflow: hidden;
  height: 100%;
  position: relative;
  border-radius: 10px;
}
</style>
