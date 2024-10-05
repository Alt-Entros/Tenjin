import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSavedStore = defineStore('saved', () => {
  const savedVacancies = ref(JSON.parse(localStorage.getItem('savedVacancies')) || [])

  function saveVacancy(vacancy) {
    const exist = savedVacancies.value.find((v) => v.id === vacancy.id)
    if (!exist) {
      savedVacancies.value.push(vacancy)
      localStorage.setItem('savedVacancies', JSON.stringify(savedVacancies.value))
    }
  }

  function removeVacancy(vacancyId) {
    savedVacancies.value = savedVacancies.value.filter((v) => v.id !== vacancyId)
    localStorage.setItem('savedVacancies', JSON.stringify(savedVacancies.value))
  }

  watch(
    savedVacancies,
    (newVacancies) => {
      localStorage.setItem('savedVacancies', JSON.stringify(newVacancies))
    },
    { deep: true }
  )

  return { savedVacancies, saveVacancy, removeVacancy }
})
