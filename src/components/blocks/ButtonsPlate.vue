<template>
  <SimplePlate class="buttons">
    <div class="buttons-wrapper">
      <SimpleButton
        v-for="btn in btnList"
        :key="btn.value"
        @click="selectHandler(btn)"
        :is-active="localValue.value === btn.value"
      >
        {{btn.name}}
      </SimpleButton>
    </div>
  </SimplePlate>
</template>
<script>
import SimplePlate from '@/components/ui/SimplePlate'
import SimpleButton from '@/components/ui/SimpleButton'

export default {
  name: 'ButtonsPlate',
  components: {
    SimpleButton,
    SimplePlate
  },
  props: {
    btnList: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    selectHandler (btn) {
      this.localValue = btn
      this.$emit('btnClick')
    }
  }
}
</script>
<style scoped>
.buttons-wrapper {
  padding: 10px;
  display: flex;
  gap: 10px;
  overflow-y: auto;
}

</style>
