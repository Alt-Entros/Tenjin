<script setup>
import aegisFooter from './components/aegisFooter.vue'
</script>

<template>
  <div class="w-full font-inter text-tc">
    <router-view v-slot="{ Component }">
      <transition nama="slide">
        <keep-alive exclude="detailsCard, dropDownMenu">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <aegisFooter class="fixed bottom-0 z-10" />
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
