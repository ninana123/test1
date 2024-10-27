<script setup>
import {computed, onMounted, ref} from "vue";
import Logo from '@/assets/logo.svg'
import LogoWhite from '@/assets/logo-white.svg'
import {breakpoints} from "@/mixins/breakpointsMixin.js";

const isNavbarHidden = ref(false);
let previousScrollPos = 0;

const handleScroll = () => {

  const currentScrollPos = window.scrollY;
  isNavbarHidden.value = currentScrollPos >= 500 && currentScrollPos > previousScrollPos;
  previousScrollPos = currentScrollPos;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const menuVisible = ref(false)

const toggleMenu = () => {

  menuVisible.value = !menuVisible.value;
}
</script>

<template>
  <header class="sticky top-0 mt-2 z-10  w-full  transition-all duration-300 ease-in-out"
       :class="{ 'translate-y-[-50px] opacity-0 pointer-events-none': isNavbarHidden, 'translate-y-0 opacity-100': !isNavbarHidden}">
    <div class="container">
      <div
          class="w-full flex  justify-between items-center h-20 px-14 bg-c-white rounded-2xl xl:px-10 md:px-2 shadow-lg">
        <div class="w-16">
          <router-link :to="{name:'Home'}">
            <img
                class="md:max-w-[55px] "
                :src="Logo"
                alt="Логотип"
            />
          </router-link>
        </div>
        <nav class="navbar ">
          <ul class="w-full text-lg flex gap-x-20 justify-between xl:gap-x-12 lg:gap-x-4 lg:text-sm md:gap-x-2">
            <li class="navbar__link sm:hidden">
              <router-link :to="{name:'Home',hash:'#services'}">Тарифы</router-link>
            </li>
            <li class="navbar__link sm:hidden">
              <router-link :to="{name:'Home',hash:'#contacts'}">Контакты</router-link>
            </li>
            <li class="navbar__link sm:hidden">
              <router-link :to="{name:'Home',hash:'#faqs'}">FAQs</router-link>
            </li>
            <li class="navbar__link sm:hidden">
              <router-link :to="{name:'Profile'}">Личный кабинет</router-link>
            </li>
            <li class="navbar__link sm:hidden navbar__feedback">
              <router-link :to="{name:'Home',hash:'#feedback'}">Связаться с нами</router-link>
            </li>
            <li class="navbar__link mobile__show">
              <button @click="toggleMenu" class="border-2 px-3 py-1 text-c-black-1 rounded-md">MENU</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  <div  :class="[menuVisible ? 'translate-x-0' : 'translate-x-[100%]']" class="transition-transform duration-300 ease-in-out  fixed top-0 z-30 w-full min-h-screen" @click="toggleMenu">
    <div
        @click.stop
        class="absolute transition-transform duration-300 ease-in-out flex flex-col h-full justify-between w-[50%] right-0 bg-c-blue-1 px-4 py-8"
        :class="[menuVisible ? 'translate-x-0' : 'translate-x-[100%]']"
    >
      <div>
        <img class="max-w-20" src="@/assets/logo-white.svg" alt="logo">
      </div>
      <nav>
        <ul class="">
          <li class="navbar__link ">
            <router-link @click="toggleMenu" class="text-white font-bold text-xl" :to="{name:'Home',hash:'#services'}">Тарифы</router-link>
          </li>
          <li class="navbar__link ">
            <router-link @click="toggleMenu" class="text-white font-bold text-xl" :to="{name:'Home',hash:'#contacts'}">Контакты</router-link>
          </li>
          <li class="navbar__link ">
            <router-link @click="toggleMenu" class="text-white font-bold text-xl" :to="{name:'Home',hash:'#faqs'}">FAQs</router-link>
          </li>
          <li class="navbar__link ">
            <router-link @click="toggleMenu" class="text-white font-bold text-xl" :to="{name:'Profile'}">ЛК</router-link>
          </li>
        </ul>
      </nav>
      <q-btn label="Связаться" no-caps color="white" outline></q-btn>
    </div>
  </div>
  <div v-if="menuVisible" class="fixed z-20 w-full min-h-screen bg-c-black-1/80">

  </div>
</template>

<style scoped>
.navbar__link {
  padding: 10px;
  cursor: pointer;
  transition: all .3s ease-out;
}

.navbar__link:hover {
  color: #3831fe;
}

.navbar__feedback {

  color: #3831fe;
  border-radius: 10px;
  border: 2px solid #3831fe; /* Начальное состояние - прозрачная граница */
  transition: all .3s ease-out;

}

.navbar__feedback_white {
  color: white;
  border-radius: 10px;
  border: 2px solid white; /* Начальное состояние - прозрачная граница */
  transition: all .3s ease-out;

}

.navbar__feedback:hover {
  background-color: #3831fe;
  color: white;
}

.mobile__show {
  display: none;
}

@media (max-width: 640px) {
  .mobile__show {
    display: block;
  }

  .navbar__link:hover {
    color: white;
  }
}
.translate-x-100 {
  transform: translateX(100%);
}
</style>