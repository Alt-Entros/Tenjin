<script setup>
import { ref, watch } from 'vue'
import { useVacanciesStore } from '../stores/data.js'
import search from '@/assets/img/icons/search.svg'
import filter from '@/assets/img/icons/filter.svg'

const vacanciesStore = useVacanciesStore()

const searchQuery = ref('')
const filterOpen = ref(false)

const experience = ref(vacanciesStore.experience)
const employment = ref(vacanciesStore.employment)

function searchVacancies() {
  vacanciesStore.text = searchQuery.value
  vacanciesStore.fetchVacancies()
}

watch([experience, employment], () => {
  console.log('Занятость', vacanciesStore.filters.employment)
  console.log('Занятость', vacanciesStore.filters.experience)
  vacanciesStore.experience = experience.value
  vacanciesStore.employment = employment.value
  searchVacancies()
})
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="flex items-center">
      <div class="flex justify-center items-baseline gap-2">
        <label class="relative block px-1">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-2 flex items-center pl-2">
            <img :src="search" alt="" />
          </span>
          <input
            v-model="searchQuery"
            placeholder="Профессия"
            type="text"
            class="px-10 py-3 block w-full border border-slate-300 rounded-3xl shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            @keyup.enter="searchVacancies()"
            inputmode="search"
            enterkeyhint="search"
          />
        </label>
      </div>
      <button @click="filterOpen = !filterOpen">
        <img :src="filter" alt="" />
      </button>
    </div>

    <transition name="slide" class="fixed z-50 top-0 bg-white p-10">
      <div
        v-if="filterOpen"
        class="filter-container flex justify-between gap-5 rounded-3xl shadow-2xl"
      >
        <div class="flex flex-col gap-3">
          <div>
            <div class="flex">
              <p>Опыт:</p>
              <select v-model="experience" class="text-black ml-2">
                <option value="">Выберите опыт</option>
                <option
                  v-for="filter in vacanciesStore.filters.experience"
                  :key="filter.id"
                  :value="filter.value"
                >
                  {{ filter.name }}
                </option>
              </select>
            </div>
            <div class="flex">
              <p>Занятость:</p>
              <select v-model="employment" class="text-black ml-2">
                <option value="">Выберите тип занятости</option>
                <option
                  v-for="filter in vacanciesStore.filters.employment"
                  :key="filter.id"
                  :value="filter.value"
                  class="text-black"
                >
                  {{ filter.name }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <button
              @click="filterOpen = !filterOpen"
              class="w-full p-2 bg-tc text-white rounded-2xl font-bold active:bg-tcActive transition duration-500"
            >
              <p>Искать</p>
            </button>
          </div>
        </div>
      </div>
    </transition>
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
