<template>
  <div class="modal-back" v-show="localValue" @click.self="close">
    <div class="modal" :style="{'max-width': width}">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SimpleModal',
  props: {
    width: {
      type: String,
      default: '320px'
    },
    value: {
      type: Boolean,
      default: false
    },
    closeRoute: {
      type: [String, Object],
      default: ''
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
    close () {
      this.localValue = false
      if (this.closeRoute) {
        this.$router.push(this.closeRoute)
      }
    },
    open () {
      this.localValue = true
    }
  }
}
</script>
<style scoped>
.modal-back {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: var(--white-color);
  padding: 15px;
  border-radius: 10px;
  width: 100%;
}
</style>
