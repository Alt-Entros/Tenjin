<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSavedStore } from '@/stores/saved'
import { useVacanciesStore } from '@/stores/data'
import dropDownMenu from '@/components/dropDownMenu.vue'
import back from '@/assets/img/icons/back.svg'
import saveIcon from '@/assets/img/icons/saved.svg'
import noSaveIcon from '@/assets/img/icons/no-saved.svg'

defineOptions({
  name: 'detailsCard'
})

const router = useRouter()
const route = useRoute()
const savedStore = useSavedStore()
const vacanciesStore = useVacanciesStore()

const vacancy = ref(null)
const loading = ref(true)
const error = ref(null)
const cardID = Number(route.params.id)

const isSaved = computed(() => {
  return savedStore.savedVacancies.some((v) => Number(v.id) === cardID)
})

function findVacancy() {
  const id = cardID
  console.log('Ищем вакансию с ID:', id)
  vacancy.value = savedStore.savedVacancies.find((v) => Number(v.id) === id)
  if (!vacancy.value) {
    vacancy.value = vacanciesStore.vacancies.find((v) => Number(v.id) === id)
  }
  if (vacancy.value) {
    if (!vacancy.value.key_skills) {
      vacancy.value.key_skills = []
    }
    console.log('Вакансия найдена:', vacancy.value)
    loading.value = false
  } else {
    error.value = 'Вакансия не найдена.'
    loading.value = false
    console.log('Вакансия не найдена в хранилищах.')
  }
}

onMounted(async () => {
  findVacancy()
})

const goBack = () => {
  router.back()
}

function toggleSave() {
  if (!vacancy.value) {
    console.error('Вакансия не определена, невозможно выполнить сохранение/удаление.')
    return
  }

  if (isSaved.value) {
    savedStore.removeVacancy(vacancy.value.id)
  } else {
    savedStore.saveVacancy({
      id: Number(vacancy.value.id),
      name: vacancy.value.name,
      employer: vacancy.value.employer,
      employment: vacancy.value.employment,
      salary: vacancy.value.salary,
      description: vacancy.value.description,
      experience: vacancy.value.experience,
      key_Skills: vacancy.value.key_skills
    })
  }
}

function formatSalary(salary) {
  if (!salary || salary.from === null) {
    return 'не указано  '
  }
  return `${salary.from}${salary.to ? ` - ${salary.to}` : ''} руб`
}
</script>

<template>
  <div class="min-h-screen pb-20">
    <div v-if="loading">
      <p>Загрузка данных...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="p-3">
      <div class="grid grid-cols-2 px-2">
        <button @click="goBack">
          <img :src="back" alt="Назад" />
        </button>
        <button @click="toggleSave" class="justify-self-end">
          <img :src="isSaved ? saveIcon : noSaveIcon" alt="Сохранить" class="w-8" />
        </button>
      </div>
      <div class="p-5">
        <h1 class="font-extrabold text-3xl">{{ vacancy.name }}</h1>
        <p class="font-medium text-2xl">
          Зарплата:
          <span class="font-bold text-xl">
            {{ formatSalary(vacancy.salary) }}
          </span>
        </p>
        <p class="text-xm">{{ vacancy.experience.name }}</p>
        <div class="grid grid-cols-2">
          <p class="flex flex-col">
            <span class="font-medium text-xl"> Наниматель:</span>
            <span class="text-black font-bold text-xs pl-2">
              {{ vacancy.employer.name }}
            </span>
          </p>
          <p class="flex flex-col">
            <span class="font-medium text-xl"> Занятость: </span>
            <span class="text-black font-bold text-xs pl-2">
              {{ vacancy.employment.name }}
            </span>
          </p>
        </div>
        <div>
          <div v-if="vacancy.key_skills && vacancy.key_skills.length === 0">
            <p
              class="text-white uppercase text-xl font-bold text-center bg-warning my-4 p-2 rounded-3xl text-sm"
            >
              Отсутсвует информация
            </p>
          </div>
          <div v-else class="mt-2">
            <dropDownMenu :key_scills="vacancy.key_skills" />
          </div>
        </div>
        <div class="flex flex-col gap-1 mt-5">
          <p class="font-medium text-xl">Описание:</p>
          <p class="" v-html="vacancy.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
