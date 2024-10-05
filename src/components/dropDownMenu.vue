<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'dropDownMenu'
})

const showMenu = ref(false)

const props = defineProps({
  key_scills: Array
})

function beforeEnter(el) {
  el.style.height = '0'
  el.style.opacity = '0'
  requestAnimationFrame(() => {
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  })
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'
  requestAnimationFrame(() => {
    el.style.height = '0'
    el.style.opacity = '0'
  })
}
</script>

<template>
  <div class="flex flex-col">
    <button
      @click="showMenu = !showMenu"
      class="bg-tc text-white p-2 my-5 rounded-2xl font-bold text-3xl active:bg-tcActive transition duration-500"
    >
      Навыки
    </button>
    <transition name="slide-fade" @enter="beforeEnter" @leave="beforeLeave">
      <ul v-if="showMenu" class="grid grid-cols-2 gap-2 mt-2">
        <li
          class="text-white bg-tc py-2 rounded-3xl text-sm place-content-center"
          v-for="key_sckill in props.key_scills"
          :key="key_sckill.id"
        >
          <p class="p-4">
            {{ key_sckill.name }}
          </p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    height 0.5s ease,
    opacity 0.5s ease;
}

.slide-fade-enter-from {
  height: 0;
  opacity: 0;
}

.slide-fade-enter-to {
  height: auto;
  opacity: 1;
}

.slide-fade-leave-from {
  height: auto;
  opacity: 1;
}

.slide-fade-leave-to {
  height: 0;
  opacity: 0;
}
</style>
