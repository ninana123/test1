<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full ">
                <div class=" shadow overflow-hidden sm:rounded-lg">
                    <div class="p-4 bg-c-black-3 text-white">
                        <h2 class="text-2xl font-bold mb-4">Форма редактирования пользователя</h2>
                        <form @submit.prevent="update" class="space-y-4">
                            <div>
                                <label for="userName" class="block mb-1">Имя</label>
                                <input id="userName" type="text" v-model="form.name"
                                       class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white"
                                       :class="{'border-2 border-red':errors?.name}"
                                >
                                <div v-if="errors.name" class="mt-2 text-red">{{ errors.name[0] }}</div>

                              <label for="userEmail" class="block mb-1 mt-4">Почта</label>
                              <input id="userEmail" type="email" v-model="form.email"
                                     class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white"
                                     :class="{'border-2 border-red':errors?.email}"
                              >
                              <div v-if="errors.email" class="mt-2 text-red">{{ errors.email[0] }}</div>

                              <label for="userSubscription" class="block mb-1 mt-4">Подписка</label>
                              <input id="userName" type="text" v-model="form.has_subscription"
                                     class="border border-gray rounded-md p-2 w-full bg-c-black-3 text-white"
                                     :class="{'border-2 border-red':errors?.has_subscription}"
                              >
                              <div v-if="errors.has_subscription" class="mt-2 text-red">{{ errors.has_subscription[0] }}</div>

                            </div>

                            <button type="submit"
                                    class="bg-blue text-white px-4 py-2 rounded-md">Применить изменения
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useLoadingStore} from "@/stores/loadingStore.js";
import {Loading} from "quasar";

const router = useRouter()
const loadingStore =  useLoadingStore()

const props = defineProps({
    id:Number
})

const user = ref({})

const form = reactive({
    name: '',
    email: '',
  has_subscription: ''
})

const errors = ref({})

onMounted(()=>{
    getUser()
})

function getUser () {
    loadingStore.toggleLoad()

    axios.get(`/api/admin/users/${props.id}/edit`)
        .then(res => {
            user.value = res.data
            form.name = res.data.name
            form.email = res.data.email
            form.has_subscription = res.data.has_subscription

        })
        .catch(error=>{
            if (error.response.status === 404) {
                router.push({name:'404'})
            }
        })
        .finally(() => {
            loadingStore.toggleLoad()
        })
}
function update() {
  Loading.show()
  axios.put(`/api/admin/users/${props.id}`, form)
      .then(() => {
        router.push({name: 'admin.users'})
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

</script>
