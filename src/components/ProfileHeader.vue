<script setup>
import {onMounted, ref} from "vue";
import {breakpoints} from "@/mixins/breakpointsMixin.js";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/userStore.js";

const isNavbarHidden = ref(false);
let previousScrollPos = 0;

const userStore = useUserStore()
const logout = () =>{
  userStore.logout()
}
const handleScroll = () => {

  const currentScrollPos = window.scrollY;
  isNavbarHidden.value = currentScrollPos >= 500 && currentScrollPos > previousScrollPos;
  previousScrollPos = currentScrollPos;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="z-10 w-full transition-all duration-300 ease-in-out"
       :class="{ 'translate-y-[-50px] opacity-0': isNavbarHidden, 'translate-y-0 opacity-100': !isNavbarHidden}">
    <div>
      <div class="w-full flex items-center justify-between h-20 bg-white rounded-2xl">
        <div class="flex items-center gap-20 sm:gap-4">
          <div class="w-16">
            <router-link :to="{name:'Home'}">
              <q-img src="@/assets/logo.svg" alt="Логотип"/>
            </router-link>
          </div>
          <nav class="navbar sm:hidden">
            <ul class="w-full text-lg flex gap-x-16 justify-between sm:gap-x-4">
              <li class="navbar__link">
                <router-link :to="{name:'Home'}">Вернуться на главную</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="flex gap-4">
          <q-avatar
              color="primary"
              text-color="white"
              :size="breakpoints.isSmaller('md') ? 'md':'xl'"
          >
            {{userStore.user ? userStore.user.name[0] : 'U'}}
          </q-avatar>
          <button @click="logout" class="text-red">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.navbar__link {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid transparent; /* Начальное состояние - прозрачная граница */
  transition: color .3s ease-out, border-color .3s ease-out; /* Переход для цвета и границы */
  cursor: pointer;
}

.navbar__link:hover {
  color: #3831fe; /* Цвет текста при наведении */
  border-color: #3831fe; /* Цвет границы при наведении */
}

</style>