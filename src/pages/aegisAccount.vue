<script setup>
import logo from '@/assets/img/Account_Logo.svg'
</script>

<template>
  <div class="flex flex-col items-center mb-20">
    <h1 class="text-3xl font-bold mt-10">Мой Профиль</h1>
    <div class="flex flex-col items-center my-10 gap-3">
      <img :src="logo" alt="" class="w-26 rounded-full border-4 border-slate-600" />
      <div class="flex flex-col items-center">
        <h2 class="text-2xl font-bold">Бурдин Дмитрий</h2>
        <p>Веб-дизайнер</p>
      </div>
    </div>
    <div class="px-10">
      <h2 class="text-3xl font-bold">О себе</h2>
      <p>
        Привет! Меня зовут Дмитрий Бурдин, и я занимаюсь веб-дизайном. Моя работа – создавать
        эстетичные и удобные интерфейсы, которые делают взаимодействие с веб-сайтами приятным и
        понятным. Мне нравится, когда визуальная часть гармонично соединяется с функциональностью, и
        я всегда стремлюсь к лучшему результату. Вдохновение я черпаю в повседневной жизни, будь то
        прогулка по парку или интересный дизайн кафе. В своей работе я использую современные
        инструменты и технологии, чтобы создавать проекты, которые помогают бизнесам становиться
        лучше.
      </p>
    </div>
  </div>
</template>
<style scoped></style>
