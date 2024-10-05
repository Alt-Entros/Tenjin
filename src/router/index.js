import { createRouter, createWebHistory } from 'vue-router'
import aegisCardList from '@/pages/aegisCardList.vue'
import aegisSavedVacancies from '@/pages/aegisSavedVacansies.vue'
import aegisSetting from '@/pages/aegisAccount.vue'
import detailsCard from '@/components/detailsCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: aegisCardList
    },
    {
      path: '/saved',
      name: 'saved',
      component: aegisSavedVacancies
    },
    {
      path: '/setting',
      name: 'setting',
      component: aegisSetting
    },
    {
      path: '/details/:id',
      name: 'details',
      component: detailsCard,
      props: true
    }
  ]
})

export default router
