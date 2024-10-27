<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div v-if="lessons"
             class=" shadow overflow-hidden sm:rounded-lg flex flex-col"
        >
          <div class="py-2 flex space-x-4">
            <router-link :to="{name:'admin.lessons.create'}"
                         class="bg-green text-sm text-white font-bold py-2 px-4 rounded">
              Создать
            </router-link>
          </div>
          <table class="w-full divide-y divide-gray mt-4">
            <thead class="bg-c-black-3 text-white">
            <tr class="mt-4">
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray dark:bg-boxdark uppercase tracking-wider">
                ID
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Заголовок
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Подзаголовок
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Описание
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Превью
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Изменение
              </th>
              <th scope="col"
                  class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Удаление
              </th>
            </tr>
            </thead>
            <tbody class="bg-c-black-3 text-white  divide-y divide-gray">
            <tr v-for="lesson in lessons.data" :key="lesson.id">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  {{ lesson.id }}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  {{ textCropping(lesson.title) }}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  {{ textCropping(lesson.subtitle) }}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  {{ textCropping(lesson.description) }}
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  <img src="" alt="">
                </div>
              </td>
              <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative ">
                <div class="group text-sm font-medium inline-block">
                  <router-link :to="{name:'admin.lessons.edit',params:{id:lesson.id}}"
                               class="bg-yellow-9 text-white font-bold py-2 px-4 rounded">
                    Изменить
                  </router-link>
                </div>
              </td>
              <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative">
                <div class="group text-sm font-medium inline-block">
                  <button @click="deleteIllustration(lesson.id)"
                          class="bg-red text-white font-bold py-2 px-4 rounded">
                    Удалить
                  </button>
                </div>
              </td>

            </tr>
            </tbody>
          </table>

          <div class="flex justify-center mt-5 ">
            <TailwindPagination
                :data="lessons"
                @pagination-change-page="getReviews"
                class="pagination flex bg-c-black-3 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {TailwindPagination} from 'laravel-vue-pagination';
import {useLoadingStore} from "@/stores/loadingStore.js";
import {textCropping} from "@/mixins/textCroppingMixin.js";

const loadingStore = useLoadingStore()
const lessons = ref({})

onMounted(() => {
  getReviews();
})

function getReviews(page = 1) {
  loadingStore.toggleLoad()

  axios.get(`/api/admin/lessons?page=${page}`)
      .then(res => {
        lessons.value = res.data
      })
      .finally(() => {
        loadingStore.toggleLoad()
      })
}

function deleteIllustration(id) {
  loadingStore.toggleLoad()

  if (confirm('Вы точно хотите удалить?')) {
    axios.delete(`/api/admin/lessons/${id}`)
        .then(res => {
          getReviews(lessons.value.current_page)
        })
        .finally(() => {
          loadingStore.toggleLoad()
        })
  } else {
    loadingStore.toggleLoad()
  }
}
</script>


<style>

.pagination span {
  display: none;
}

.pagination button {
  background-color: #1E2222 !important;
}

.pagination button:disabled {
  background: #444444 !important;
}

.pagination button svg {
  width: 25px
}
</style>
