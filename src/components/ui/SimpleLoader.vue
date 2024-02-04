<template>
  <div class="loader">
    <span class="loader-element"></span>
  </div>
</template>
<script>
export default {
  name: 'SimpleLoader'
}
</script>
<style scoped>
.loader {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-element {
  width: 48px;
  height: 48px;
  border: 3px solid var(--grey-color);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader-element::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: var(--danger-color) transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
