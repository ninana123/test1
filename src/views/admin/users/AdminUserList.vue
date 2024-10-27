<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="align-middle inline-block min-w-full">
                <div v-if="users"
                     class=" shadow overflow-hidden sm:rounded-lg flex flex-col"
                >
                    <table class="w-full divide-y divide-gray mt-4">
                        <thead class="bg-c-black-3 text-white">
                        <tr class="mt-4">
                            <th scope="col"
                                class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray dark:bg-boxdark uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col"
                                class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider">
                                Имя
                            </th>
                            <th scope="col"
                                class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider md:hidden">
                                email
                            </th>
                          <th scope="col"
                              class="px-4 py-3 sm:px-2 text-left text-xs font-medium text-gray uppercase tracking-wider md:hidden">
                            Подписка
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
                        <tr v-for="user in users.data" :key="user.id">
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium">
                                    {{ user.id }}
                                </div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium">
                                    {{ user.name }}
                                </div>
                            </td>
                            <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative md:hidden">
                                <div class="group text-sm font-medium inline-block">
                                   {{user.email}}

                                </div>
                            </td>
                          <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative md:hidden">
                            <div class="group text-sm font-medium inline-block">
                              {{user.has_subscription }}

                            </div>
                          </td>
                            <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative ">
                                <div class="group text-sm font-medium inline-block">
                                    <router-link :to="{name:'admin.users.edit',params:{id:user.id}}"
                                                 class="bg-yellow-9 text-white font-bold py-2 px-4 rounded">
                                        Изменить
                                    </router-link>
                                </div>
                            </td>
                            <td class=" px-4 py-4 sm:px-2 whitespace-nowrap relative">
                                <div class="group text-sm font-medium inline-block">
                                    <button @click="deleteUser(user.id)"
                                            class="bg-red-6 text-white font-bold py-2 px-4 rounded">
                                        Удалить
                                    </button>
                                </div>
                            </td>

                        </tr>
                        </tbody>
                    </table>

                    <div class="flex justify-center mt-5 ">
                        <TailwindPagination
                            :data="users"
                            @pagination-change-page="getUsers"
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

const users = ref({})
const loadingStore = useLoadingStore()

onMounted(()=>{
    getUsers();
})

function getUsers(page = 1) {
    loadingStore.toggleLoad()

    axios.get(`/api/admin/users?page=${page}`)
        .then(res => {
            users.value = res.data
        })
        .finally(() => {
            // loadingStore.toggleLoad()
        })
}
function deleteUser(id) {
    loadingStore.toggleLoad()

    if (confirm('Вы точно хотите удалить?')){
        axios.delete(`/api/admin/users/${id}`)
            .then(res => {
                getUsers(users.value.current_page)
            })
            .finally(()=>{
                loadingStore.toggleLoad()
            })
    } else {
        loadingStore.toggleLoad()
    }
}
</script>

<style>

.pagination span{
    display:none;
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
