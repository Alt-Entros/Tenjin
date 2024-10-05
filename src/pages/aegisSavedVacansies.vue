<script setup>
import { computed, watch } from 'vue'
import { useSavedStore } from '@/stores/saved.js'
import aegisCard from '@/components/aegisCard.vue'

const savedStore = useSavedStore()

const savedVacancies = computed(() => savedStore.savedVacancies)

watch(
  () => savedStore.savedVacancies,
  () => {}
)
</script>

<template>
  <div class="min-h-screen flex flex-col gap-2 items-center pb-20 bg-pattern">
    <h1 class="text-3xl font-bold uppercase mt-6 mb-10">Сохраненые</h1>
    <aegisCard
      v-for="vacancy in savedVacancies"
      :key="vacancy.id"
      :name="vacancy.name"
      :employer="vacancy.employer"
      :employment="vacancy.employment"
      :salary="vacancy.salary"
      :description="vacancy.description"
      :id="Number(vacancy.id)"
    />
  </div>
</template>

<style scoped></style>
