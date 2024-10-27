<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full ">
        <div class=" shadow overflow-hidden sm:rounded-lg">
          <div class="p-4 bg-c-black-3 text-white">
            <h2 class="text-2xl font-bold mb-4">Форма изменения урока</h2>
            <form @submit.prevent="update" class="space-y-4">
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
                <label for="lessonDescription" class="block mb-1">Описание под видео</label>
                <textarea id="lessonDescription" type="text" v-model="form.description"
                          class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white resize-none h-48"
                          :class="{'border-2 border-red':errors?.description}"
                ></textarea>
                <div v-if="errors.description" class="mt-2 text-red">{{ errors.description[0] }}</div>
              </div>

              <button type="submit"
                      class="bg-blue text-white px-4 py-2 rounded-md">Изменить
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

import {ref, reactive, onMounted} from "vue";
import axios from "axios";


import {useLoadingStore} from "@/stores/loadingStore.js";
import {Loading} from "quasar";
import router from "@/router/index.js";

const loadingStore = useLoadingStore()
const previewUrl = ref({})
const videoUrl = ref({})
const errors = ref({})

const props = defineProps({
  id: Number
})

const form = reactive({
  title: '',
  subTitle: '',
  description: ''

})

onMounted(()=>{
  getLesson()
})
function getLesson() {
  Loading.show()
  axios.get(`/api/admin/lessons/${props.id}/edit`)
      .then(({data}) => {
        form.title = data.title
        form.subTitle = data.subtitle
        form.description = data.description
      })
      .finally(() => {
        Loading.hide()
      })
}
function update() {
  Loading.show()

  axios.put(`/api/admin/lessons/${props.id}`, form)
      .then(() => {
        router.push({name: 'admin.lessons'})
      })
      .catch(error => {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        Loading.hide()
      })
}
</script>






















<!--
<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full ">
                <div class=" shadow overflow-hidden sm:rounded-lg">
                    <div class="p-4 bg-c-black-3 text-white">
                        <h2 class="text-2xl font-bold mb-4">Форма редактирования отзыва</h2>
                        <form @submit.prevent="update" class="space-y-4">
                            <div>
                                <label for="reviewText" class="block mb-1">Текст</label>
                                <textarea id="reviewText" type="text" v-model="form.text"
                                          class="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white resize-none h-48"
                                          :class="{'border-2 border-red-600':errors?.text}"
                                ></textarea>
                                <div v-if="errors.text" class="mt-2 text-red-600">{{ errors.text[0] }}</div>
                            </div>
                            <div>
                                <label for="reviewCategory" class="block mb-1">Категория</label>
                                <select id="reviewCategory"
                                        class="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white"
                                        :class="{'border-2 border-red-600':errors?.category}"
                                        v-model="form.category">
                                    <option disabled value="">Выберите категорию</option>
                                    <option v-for="category in categories"
                                            :value="category.value">
                                        {{ category.name }}
                                    </option>
                                </select>
                                <div v-if="errors.category" class="mt-2 text-red-600">{{ errors.category[0] }}</div>
                            </div>
                            <div>
                                <label for="reviewCustomerName" class="block mb-1">Имя заказчика / Название
                                    компании</label>
                                <input id="reviewCustomerName" type="text" v-model="form.customerName"
                                       class="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white"
                                       :class="{'border-2 border-red-600':errors?.customerName}"
                                >
                                <div v-if="errors.customerName" class="mt-2 text-red-600">{{
                                        errors.customerName[0]
                                    }}
                                </div>
                            </div>
                            <div>
                                <label for="reviewCustomerLink" class="block mb-1">Ссылка</label>
                                <input id="reviewCustomerLink" type="text" v-model="form.customerLink"
                                       class="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white"
                                       :class="{'border-2 border-red-600':errors?.customerLink}"
                                >
                                <div v-if="errors.customerLink" class="mt-2 text-red-600">{{
                                        errors.customerLink[0]
                                    }}
                                </div>
                            </div>
                            <button type="submit"
                                    class="bg-blue-500 text-white px-4 py-2 rounded-md">Изменить
                                отзыв
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalLoading />
</template>

<script setup>
import axios from "axios";
import { reactive, ref} from "vue";
import {useRouter} from "vue-router";
import ModalLoading from "@components/loading/ModalLoading.vue";
import {useLoadingStore} from "@stores/loadingStore.js";

const router = useRouter()
const loadingStore = useLoadingStore()

const props = defineProps({
    id: Number
})

const categories = [
    {name: 'Дизайн', value: 'design'},
    {name: 'Иллюстрация', value: 'user'}
]

const form = reactive({
    text: '',
    category: '',
    customerName: '',
    customerLink: ''
})

const errors = ref({})

loadingStore.toggleLoad()

axios.get(`/api/admin/lessons/${props.id}/edit`)
    .then(res => {
        form.text = res.data.text
        form.category = res.data.category
        form.customerName = res.data.customer_name
        form.customerLink = res.data.customer_link
    })
    .catch(error => {
        if (error.response.status === 404) {
            router.push({name: '404'})
        }
    })
    .finally(() => {
        loadingStore.toggleLoad()
    })

function update() {
    loadingStore.toggleLoad()

    axios.patch(`/api/admin/lessons/${props.id}`, form)
        .then(() => {
            router.push({name: 'admin.lessons'})
        })
        .catch(error => {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        })
        .finally(() => {
            loadingStore.toggleLoad()
        })
}

</script>
-->