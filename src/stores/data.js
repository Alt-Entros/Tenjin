import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useVacanciesStore = defineStore(
  'vacancies',
  () => {
    const url = 'https://api.hh.ru/vacancies'
    const text = ref('')
    const area = ref('1975')
    const per_page = ref(40)

    const experience = ref('')
    const employment = ref('')

    const vacancies = ref([])
    const loading = ref(false)
    const error = ref(null)

    const filters = {
      experience: [
        { id: 1, name: 'Нет опыта', value: 'noExperience' },
        { id: 2, name: 'От 1 года до 3 лет', value: 'between1And3' },
        { id: 3, name: 'От 3 до 6 лет', value: 'between3And6' },
        { id: 4, name: 'Более 6 лет', value: 'moreThan6' }
      ],
      employment: [
        { id: 1, name: 'Полная занятость', value: 'full' },
        { id: 2, name: 'Частичная занятость', value: 'part' },
        { id: 3, name: 'Проектная работа', value: 'project' },
        { id: 4, name: 'Стажировка', value: 'self' }
      ]
    }

    async function fetchVacancies() {
      loading.value = true
      error.value = null

      const params = {
        text: text.value,
        area: area.value,
        per_page: per_page.value
      }

      // Только добавляем фильтры, если они не пустые
      if (experience.value) {
        params.experience = experience.value
      }
      if (employment.value) {
        params.employment = employment.value
      }

      try {
        console.log('Опыт:', filters.experience)
        console.log('Занятость:', filters.employment)
        console.log('Загрузка вакансий')
        const response = await axios.get(url, { params })
        const vacancyItems = response.data.items
        console.log('Вакансии получены. Запрос дополнительной информации', vacancyItems)
        const promises = vacancyItems.map(async (vacancy) => {
          try {
            const vacancyResponse = await axios.get(vacancy.url)
            return {
              ...vacancyResponse.data
            }
          } catch (err) {
            console.log('Ошибка получения дополнительной информации: ' + err.message)
            return null
          }
        })
        vacancies.value = (await Promise.all(promises)).filter((v) => v !== null)
        console.log(vacancies.value)
      } catch (err) {
        error.value = 'Ошибка загрузки вакансий: ' + err.message
        console.log(err)
      } finally {
        loading.value = false
      }
    }

    return {
      text,
      experience,
      employment,
      filters,
      vacancies,
      fetchVacancies
    }
  },
  {
    persist: true
  }
)
