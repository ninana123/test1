<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full ">
        <div class=" shadow overflow-hidden sm:rounded-lg">
          <div class="p-4 bg-c-black-3 text-white">
            <h2 class="text-2xl font-bold mb-4">Форма добавления урока</h2>
            <form @submit.prevent="store" class="space-y-4">
              <div>
                <label for="lessonTitle" class="block mb-1">Заголовок</label>
                <input id="lessonTitle" type="text" v-model="form.title"
                       class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white"
                       :class="{'border-2 border-red':errors?.title}"
                >
                <div v-if="errors.title" class="mt-2 text-red">{{
                    errors.title[0]
                  }}
                </div>
              </div>
              <div>
                <label for="lessonSubTitle" class="block mb-1">Подзаголовок</label>
                <input id="lessonSubTitle" type="text" v-model="form.subTitle"
                       class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white"
                       :class="{'border-2 border-red':errors?.subTitle}"
                >
                <div v-if="errors.subTitle" class="mt-2 text-red">{{
                    errors.subTitle[0]
                  }}
                </div>
              </div>

              <div>
                <div class="block mb-1">Превью:</div>
                <input type="file"
                       @change="onFileChange"
                       ref="previewUrl"
                       class="border border-gray rounded-md p-2 w-full bg-gray text-white"
                       :class="{'border-2 border-red':errors.previewUrl}"
                >
                <div v-if="errors.previewUrl" class="mt-2 text-red">{{ errors.previewUrl[0] }}</div>
              </div>

              <div>
                <div class="block mb-1">Видео:</div>
                <input type="file"
                       @change="onVideoChange"
                       ref="videoUrl"
                       class="border border-gray rounded-md p-2 w-full bg-gray text-white"
                       :class="{'border-2 border-red':errors.videoUrl}"
                >
                <div v-if="errors.videoUrl" class="mt-2 text-red">{{ errors.videoUrl[0] }}</div>
              </div>

              <div>
                <label for="lessonDescription" class="block mb-1">Описание под видео</label>
                <textarea id="lessonDescription" type="text" v-model="form.description"
                          class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white resize-none h-48"
                          :class="{'border-2 border-red':errors?.description}"
                ></textarea>
                <div v-if="errors.description" class="mt-2 text-red">{{ errors.description[0] }}</div>
              </div>

              <button type="submit"
                      class="bg-blue text-white px-4 py-2 rounded-md">Добавить
                урок
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, reactive} from "vue";
import axios from "axios";


import {useLoadingStore} from "@/stores/loadingStore.js";
import {Loading} from "quasar";

const loadingStore = useLoadingStore()
const previewUrl = ref({})
const videoUrl = ref({})
const errors = ref({})

const form = reactive({
  title: '',
  subTitle: '',
  previewUrl: '',
  videoUrl: '',
  description: ''

})

function store() {
  Loading.show()
  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('subTitle', form.subTitle)
  formData.append('previewUrl', form.previewUrl)
  formData.append('videoUrl', form.videoUrl)
  formData.append('description', form.description)


  axios.post('/api/admin/lessons', formData)
      .then(() => {
        Object.keys(form).forEach(item => form[item] = "")
        previewUrl.value.value = null
        videoUrl.value.value = null
        if (errors) errors.value = ''
      })
      .catch(error => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        Loading.hide()
      })
}
function onFileChange(event) {
  form.previewUrl = event.target.files[0]
}
function onVideoChange(event) {
  form.videoUrl = event.target.files[0]
}
</script>

