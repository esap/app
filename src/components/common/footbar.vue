<template>
  <div class="footwarp">
    <div class="footbar">      
      <slot></slot>
    </div>
  </div>  
</template>

<style scoped>
.footwarp {
  height: 100px;
}
.footbar {
  position: fixed;
  margin: 6px;
  bottom: 0;
  width: 96%;
}
</style>
