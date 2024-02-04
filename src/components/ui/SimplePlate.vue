<template>
  <div class="plate block-spacing">
    <div class="plate-content">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SimplePlate'
}
</script>
<style scoped>
.plate {

}
.plate-content {
  height: 100%;
  border: 1px solid var(--grey-color);
  border-radius: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
