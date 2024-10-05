<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSavedStore } from '@/stores/saved.js'
import saveIcon from '@/assets/img/icons/saved.svg'
import noSaveIcon from '@/assets/img/icons/no-saved.svg'

const savedStore = useSavedStore()

const router = useRouter()

const props = defineProps({
  id: Number,
  name: String,
  employer: Object,
  employment: Object,
  salary: Object,
  description: String,
  experience: Object,
  keySkills: Array
})

const isSaved = ref(savedStore.savedVacancies.some((v) => v.id === props.id))

watch(
  () => savedStore.savedVacancies,
  (newSavedVacancies) => {
    isSaved.value = newSavedVacancies.some((v) => v.id === props.id)
  },
  { deep: true }
)

function toggleSave() {
  if (isSaved.value) {
    savedStore.removeVacancy(props.id)
  } else {
    savedStore.saveVacancy({
      id: props.id,
      name: props.name,
      employer: props.employer,
      employment: props.employment,
      salary: props.salary,
      description: props.description,
      experience: props.experience,
      key_Skills: props.keySkills
    })
  }
}

function formatSalary(salary) {
  if (!salary || salary.from === null) {
    return 'не указано'
  }
  return `${salary.from}${salary.to ? ` - ${salary.to}` : ''} руб`
}

function ToVacancy() {
  router.push({ path: `/details/${props.id}` })
}
</script>

<template>
  <div
    @click="ToVacancy"
    class="bg-white rounded-2xl shadow-xl shadow-cardShadow p-4 w-80 transition duration-300 active:shadow-2xl flex flex-col"
  >
    <h3 class="text-xm font-bold">{{ name }}</h3>
    <p class="text-sm text-slate-500">Наниматель: {{ employer.name }}</p>
    <div class="card__tittle">
      <div>
        <p>Занятость: {{ employment.name }}</p>
        <p class="font-bold">{{ formatSalary(salary) }}</p>
      </div>
      <button @click.stop="toggleSave" class="justify-end w-10">
        <img :src="isSaved ? saveIcon : noSaveIcon" alt="Сохранить" class="w-8" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card__tittle {
  display: grid;
  grid-template-columns: 1fr min-content;
}
</style>
