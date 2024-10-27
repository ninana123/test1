<template>
  <header
      class='w-full  bg-c-black-3 min-h-16 sticky top-0 z-50 flex items-center justify-end lg:justify-between px-6'>

    <template v-if="!showSidebarStore.showSideBar">
      <IconBurger @click="toggleSidebar()" class="icon cursor-pointer w-6 z-10 text-white"/>
    </template>
    <template v-else>
      <IconMark class="icon cursor-pointer w-6 text-c-white-1 z-10"/>
    </template>

    <div class="h-full flex justify-end px-16 lg:px-0 items-center">
      <button @click="logout" class="bg-red text-white font-bold py-2 px-4 rounded">Выйти</button>
    </div>
  </header>
</template>

<script setup>
import IconBurger from "@/components/icons/IconBurger.vue";
import {useShowSidebarStore} from '@/stores/showSidebarStore.js';
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore.js";
import IconMark from "@/components/icons/IconMark.vue";


const showSidebarStore = useShowSidebarStore()
const router = useRouter()
const isOpen = ref(false)
const toggleSidebar = () => {
  showSidebarStore.toggleSideBar()
}

function logout() {
  useUserStore().logout()
}

</script>

<style scoped>
.icon {
    display: none;
}
@media (max-width: 1024px) {
  .icon {
    display: block;
  }
}
</style>
