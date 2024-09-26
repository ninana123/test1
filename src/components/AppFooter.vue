<script setup>

import IconVk from "@/components/icons/IconVk.vue";
</script>

<template>
  <footer id="contacts">
    <div class="bg-c-blue-1">
      <div class="container">
        <div class="flex items-center">
          <div class="flex flex-col items-center mr-16">
            <img src="@/assets/logo-white.svg" alt="logo">
            <div class="flex gap-4 mt-4">
              <icon-vk  />
              <icon-vk  />
              <icon-vk  />
            </div>
          </div>
          <nav class="">
            <ul class="font-bold text-white text-lg flex justify-between gap-12">
              <li class="navbar__link">Тарифы</li>
              <li class="navbar__link">FAQs</li>
              <li class="navbar__link">Личный кабинет</li>
              <li class="navbar__link">Связаться с нами</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.navbar__link {
  padding:10px;
  border-radius: 10px;
  border: 2px solid transparent; /* Начальное состояние - прозрачная граница */
  transition: color .3s ease-out, border-color .3s ease-out; /* Переход для цвета и границы */
  font-weight: 700;
}

.navbar__link:hover {
  border-color: white; /* Цвет границы при наведении */
}
</style>