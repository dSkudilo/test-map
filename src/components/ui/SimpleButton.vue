<template>
  <button
    v-bind="$attrs"
    class="btn"
    :class="[{'btn_active':isActive}]"
    @click="$emit('click')"
  >
    <slot/>
  </button>
</template>
<script>
export default {
  name: 'SimpleButton',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.btn {
  padding: 10px 15px;
  background-color: var(--white-color);
  cursor: pointer;
  border-radius: 10px;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  transition: color var(--transition), background-color var(--transition), border-color var(--transition) ;
}
.btn:hover, .btn_active {
  background-color: var(--primary-color);
  color: var(--white-color);
  border-color: var(--primary-color);

}
</style>
