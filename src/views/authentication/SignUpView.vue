<script setup>

import AppHeader from "@/components/AppHeader.vue";
import {reactive, ref} from "vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import axios from "axios";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/userStore.js";
const register = () =>{
  axios.get('/sanctum/csrf-cookie').then(response => {
    useUserStore().register(form)
  });
}
const isPwd = ref(true)
const form = reactive({
  name:'',
  email:'',
  password: ''
})
</script>

<template>
  <AppHeader />
  <main>
    <section>
      <div class="relative bg-cover bg-center min-h-screen bg-main py-60 sm:py-32">
        <div class="container">
          <div class="flex no-wrap justify-center gap-10">
            <div
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="600"
                data-aos-offset="400"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-c-white-1 rounded-3xl px-8 py-12 max-w-[350px] w-full lg:py-8">

              <form @submit.prevent="register">
                <div class="text-center">
                  <div class="text-xl text-bold">Регистрация</div>
                  <div class="text-xs text-c-gray-4 mt-2">Добро пожаловать, партнёр!</div>
                </div>
                <div class="mt-6">
                  <label for="" class="font-bold block">Имя</label>
                  <input
                      type="text"
                      placeholder="Введите имя"
                      required
                      v-model="form.name"
                      class="border-2 bg-c-white-1 text-xs w-full mt-1 rounded-[4px] border-c-gray-4 outline-none py-2 px-2 focus:shadow-md focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 ease-in-out"
                  >
                </div>
                <div class="mt-4">
                  <label for="" class="font-bold block">Почта</label>
                  <input
                      type="email"
                      placeholder="Введите почту"
                      required
                      v-model="form.email"
                      class="border-2 bg-c-white-1 text-xs w-full mt-1 rounded-[4px] border-c-gray-4 outline-none py-2 px-2 focus:shadow-md focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 ease-in-out"
                  >
                </div>
                <div class="mt-4">
                  <label for="" class="font-bold block">Пароль</label>
                  <div
                      class="border-2 mt-1 w-full bg-c-white-1 rounded-[4px] border-c-gray-4 outline-none py-2 px-2 flex justify-between items-center no-wrap gap-2  focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-300 ease-in-out"
                  >
                    <input
                        :type="isPwd ? 'text':'password'"
                        placeholder="Придумайте пароль"
                        v-model="form.password"
                        required
                        class="outline-none w-full text-xs bg-c-white-1"
                    >
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                  </div>
                </div>

                <button class="bg-c-blue-1 text-white font-bold w-full py-2 mt-6 rounded-lg">Зарегистрироваться</button>
              </form>
              <div
                  class="text-c-gray-4 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p
                    class="mx-2 mb-0 text-center font-semibold">
                  OR
                </p>
              </div>
              <div class="text-center mt-4 text-xs">
                Уже зарегистрированы?
                <router-link :to="{name:'Login'}" class="text-bold">Войти</router-link>
              </div>
            </div>
            <div
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="200"
                data-aos-offset="200"
                class="text-white sm:hidden">
              <h1 class="text-bold text-6xl max-w-[450px] leading-normal lg:text-5xl lg:max-w-[400px]">Начни Обучайся Зарабатывай</h1>
            </div>
          </div>
        </div>
      </div>

    </section>
  </main>
</template>

<style scoped>
.bg-main {
  background-image: url('@/assets/images/bg-main2.jpg');
  background-size: cover;
  background-position: center;
}

</style>