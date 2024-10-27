import {defineStore} from 'pinia';
import axios from 'axios';
import {ref, computed, reactive} from 'vue';
import {Notify} from "quasar";
import router from "@/router/index.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        async login({email, password}) {
            try {
                const {data} = await axios.post('/api/login', {
                    email,
                    password,
                });

                if (!data.success) {
                    Notify.create({
                        type: 'negative',
                        message: data.message
                    })
                } else {

                    this.user = data.user
                    await router.push({name: 'Profile'})
                }

            } catch (error) {
                Notify.create({
                    type: 'negative',
                    message: `Ошибка авторизации: ${error.message}`
                })
            }
        },
        async register({name, email, password}) {
            try {
                const {data} = await axios.post('/api/register', {
                    name,
                    email,
                    password,
                });

                await router.push({name: 'Login'})

            } catch (error) {

                if (error.status === 409) {
                    Notify.create({
                        type: 'negative',
                        message: `Ошибка регистрации: такой пользователь уже существует`
                    })
                } else {
                    Notify.create({
                        type: 'negative',
                        message: `Ошибка регистрации: ${error.message}`
                    })
                }
            }
        },
        async logout() {
            try {
                await axios.delete('/api/logout')
                await router.push({name: 'Home'})
                this.user = null
            } catch (error) {
                Notify.create({
                    type: 'negative',
                    message: `Ошибка выхода: ${error.message}`
                })
            }
        },
        async fetchUser() {
            try {
                const {data} = await axios.get('/api/fetch_user')
                this.user = data.user
            } catch (error) {
                this.user = null
            }
        },
        isAdmin() {
            return this.user?.isAdmin
        }
    }
})