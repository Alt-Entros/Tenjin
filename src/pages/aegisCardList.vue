<script setup>
import { onMounted, computed } from 'vue'
import { useVacanciesStore } from '@/stores/data.js'
import aegisCard from '@/components/aegisCard.vue'
import aegisHeader from '@/components/aegisSearch.vue'

const vacanciesStore = useVacanciesStore()

onMounted(() => {
  vacanciesStore.fetchVacancies()
})

const vacancies = computed(() => vacanciesStore.vacancies)
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-3 pb-20 mt-5">
    <aegisHeader class="" />
    <aegisCard
      v-for="vacancy in vacancies"
      :key="vacancy.id"
      :name="vacancy.name"
      :employer="vacancy.employer"
      :employment="vacancy.employment"
      :salary="vacancy.salary"
      :description="vacancy.description"
      :id="Number(vacancy.id)"
      :experience="vacancy.experience"
      :key-skills="vacancy.key_skills"
    />
  </div>
</template>

<style scoped></style>
