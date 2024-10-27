<script setup>

import ProfileHeader from "@/components/ProfileHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/userStore.js";
import axios from 'axios'
import {Notify} from "quasar";

const showCard = ref(false);
const loading = ref(false);
const videoUrl = ref('')
const mimeType = ref('')

const userStore = useUserStore()
const hasSubscription = userStore?.user?.hasSubscription;
const lessons = ref([])
const activeCard = ref(0)

const openCard = (lessonId,index) => {
  if (hasSubscription) {
    axios.get(`/api/file/${lessonId}`)
        .then(({data}) => {

          switch (data.code) {
            case 0:
              videoUrl.value = data.data.videoUrl;
              mimeType.value = data.data.mimeType;
              showCard.value = true;
              activeCard.value = index
              break
            case 10:
              Notify.create({
                type: 'negative',
                message: 'Видео не найдено'
              })
                break
            case 20:
              Notify.create({
                type: 'negative',
                message: 'У вас нет доступа к видео. Оформите подписку'
              })
              break
          }

        })
        .catch((error) => {
          console.error('Ошибка загрузки файла:', error);
        });
  } else {
    showCard.value = true;
    activeCard.value = lessonId - 1
  }

}

onMounted(() => {
  axios.get('/api/lessons').then(({data}) => {
    lessons.value = data
  })
})

</script>

<template>
  <div>
    <ProfileHeader class="px-12 sm:px-4"/>
    <main class="min-h-screen px-12 sm:px-4">

      <section class="py-12">
        <h1
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-duration="600"
            data-aos-offset="200"
            data-aos-once="true"
            data-aos-anchor-placement="top"
            class="text-center text-4xl font-bold ">Видео-уроки</h1>
        <div
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="600"
            data-aos-offset="500"
            data-aos-once="true"
            data-aos-anchor-placement="top"
            class="mt-8 grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1">
          <div class="rounded-2xl shadow-md " v-for="(lesson,index) in lessons">
            <img class="rounded-t-2xl" :src="lesson.previewUrl" alt="Превью">
            <div class=" p-4">
              <h6>{{ lesson.title }}</h6>
              <div class="text-md font-light text-c-black-1 mt-2">{{ lesson.subtitle }}
              </div>
              <button @click="openCard(lesson.id,index)"
                      class="bg-c-blue-1 text-white font-bold w-full py-2 mt-6 rounded-xl">Открыть видео
              </button>
            </div>
          </div>
        </div>
        <q-dialog v-model="showCard">
          <template v-if="hasSubscription">
            <q-card class="card">
              <div v-if="loading">
                <q-spinner-dots size="40px" color="primary"/>
                <p>Загрузка видео...</p>
              </div>
              <div v-else>
                <video class="w-full" controls autoplay>
                  <source :src="videoUrl" id='video' :type="mimeType">
                  Your browser does not support the video tag.
                </video>
              </div>
              <q-card-section>
                <div>{{ (lessons[activeCard]).description }}</div>
              </q-card-section>
            </q-card>
          </template>
          <template v-else>
            <q-card class="card">
              <div class="max-w-[600px] p-10 mx-auto">
                <div class="mt-8 font-bold">Доступ к этому разделу доступен только для премиум-пользователей. Оформите
                  подписку и получите доступ к эксклюзивному контенту, специальным предложениям и безупречному качеству!
                </div>
                <button class="mx-auto block bg-c-blue-1 mt-6 text-white px-4 py-2">
                  <router-link :to="{name:'Home',hash:'#services'}" class="font-bold">Приобрести подписку</router-link>
                </button>
              </div>
            </q-card>
          </template>
        </q-dialog>
      </section>
    </main>

    <AppFooter
    />
  </div>
</template>

<style scoped>
.card {
  max-width: 80%;
}
</style>