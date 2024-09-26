<script setup>

</script>

<template>
  <div class="fixed z-10 w-full">
    <div class="container">
      <div class="w-full flex justify-between items-center h-20 px-6 bg-white rounded-2xl">
        <div class="w-16">
          <a href="/">
            <q-img src="@/assets/logo.svg" alt="Логотип" />
          </a>
        </div>
        <nav class="navbar">
          <ul class="w-full text-lg flex gap-x-16 justify-between">
            <li class="navbar__link"><a href="#services">Тарифы</a></li>
            <li class="navbar__link"><a href="#contacts">Контакты</a></li>
            <li class="navbar__link"><a href="#faqs">FAQs</a></li>
            <li class="navbar__link"><a href="">Личный кабинет</a></li>
            <li class="feedback"><a href="#feedback">Связаться с нами</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>

.navbar__link {
  padding:10px;
  border-radius: 10px;
  border: 2px solid transparent; /* Начальное состояние - прозрачная граница */
  transition: color .3s ease-out, border-color .3s ease-out; /* Переход для цвета и границы */
  cursor:pointer;
}

.navbar__link:hover {
  color: #3831fe; /* Цвет текста при наведении */
  border-color: #3831fe; /* Цвет границы при наведении */
}

</style>