<script setup>

import IconVk from "@/components/icons/IconVk.vue";
import IconTelegram from "@/components/icons/IconTelegram.vue";
import IconAvito from "@/components/icons/IconAvito.vue";

</script>

<template>
  <footer
      id="contacts">
    <div class="bg-c-blue-1">
      <div class="container">
        <div class="flex items-center no-wrap justify-between py-12 sm:flex-col">
          <div class="flex flex-col items-center mr-16 lg:mr-2">
            <router-link :to="{name:'Home'}">
              <img class="lg:max-w-[100px]" src="@/assets/logo-white.svg" alt="logo">
            </router-link>
            <div class="flex gap-4 mt-4">
              <a href="https://vk.com/nasvyazi_store">
                <icon-vk/>
              </a>
              <a href="https://t.me/na_svyazi_shop">
                <icon-telegram/>
              </a>
              <a href="">
                <icon-avito/>
              </a>
            </div>
          </div>
          <nav class="navbar">
            <ul class="w-full text-lg flex gap-x-16 justify-between items-center xl:gap-x-12 lg:text-base lg:gap-x-6 sm:flex-col ">
              <li class="navbar__link">
                <router-link :to="{name:'Home',hash:'#services'}" class="font-bold">Тарифы</router-link>
              </li>
              <li class="navbar__link">
                <router-link :to="{name:'Home',hash:'#faqs'}" class="font-bold">FAQs</router-link>
              </li>
              <li class="navbar__link">
                <router-link :to="{name:'Home'}" class="font-bold">Личный кабинет</router-link>
              </li>
              <li class="navbar__link navbar__feedback">
                <router-link :to="{name:'Home',hash:'#feedback'}" class="font-bold">Связаться с нами</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

  </footer>
</template>

<style scoped>
.navbar__link {
  padding: 15px 30px;
  transition: all .3s ease-out;
  cursor: pointer;
  color: white;
}

@media (max-width: 1023px) {
  
} .navbar__link{
    padding: 15px;
}

.navbar__feedback {
  border-radius: 10px;
  border: 3px solid white; /* Начальное состояние - прозрачная граница */
  transition: all .3s ease-out;
}

.navbar__feedback:hover {
  background-color: white;
  color: #3831fe;
}
</style>