import {createRouter, createWebHistory} from 'vue-router'
import {Loading} from "quasar";
import {useUserStore} from "@/stores/userStore.js";


const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to) {
        if (to.hash) return {el: to.hash, behavior: 'smooth'};
        return {top: 0, behavior: 'smooth'};
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                title: "Главная"
            },
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/sign-in',
            name: 'Login',
            component: () => import('@/views/authentication/SignInView.vue'),
            meta: {
                title: "Авторизация"
            }
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: () => import('@/views/authentication/SignUpView.vue'),
            meta: {
                title: "Регистрация"
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {
                title: "Личный кабинет",
                requiresAuth: true
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import('@/views/errors/NotFoundView.vue'),
            meta: {
                title: "Страница не найдена"
            },
        },


        {
            path: '/admin',
            component: () => import('../views/admin/AdminView.vue'),
            meta: {
                requiresAdmin: true
            },

            children: [
                {
                    path: '',
                    name: 'admin.home',
                    component: () => import('../views/admin/home/AdminHome.vue'),
                    meta: {
                        title: "Админ-панель | Главная",
                    },
                },
                {
                    path: 'users',
                    children: [
                        {
                            path: '',
                            name: 'admin.users',
                            component: () => import('@/views/admin/users/AdminUserList.vue'),
                            meta: {
                                title: "Админ-панель | Иллюстрации"
                            },
                        },
                        {
                            path: ':id/edit',
                            name: 'admin.users.edit',
                            component: () => import('@/views/admin/users/AdminUserEdit.vue'),
                            props: true,
                            meta: {
                                title: "Админ-панель | Редактирование иллюстраций"
                            },
                        }
                    ]
                },
                {
                    path: 'lessons',
                    children: [
                        {
                            path: '',
                            name: 'admin.lessons',
                            component: () => import('../views/admin/lessons/AdminLessonList.vue'),
                            meta: {
                                title: "Админ-панель | Отзывы"
                            },
                        },
                        {
                            path: 'create',
                            name: 'admin.lessons.create',
                            component: () => import('../views/admin/lessons/AdminLessonCreate.vue'),

                            meta: {
                                title: "Админ-панель | Создание отзыва"
                            },
                        },
                        {
                            path: ':id/edit',
                            name: 'admin.lessons.edit',
                            component: () => import('../views/admin/lessons/AdminLessonEdit.vue'),
                            props: true,
                            meta: {
                                title: "Админ-панель | Редактирование отзыва"
                            },
                        },
                    ]
                },
            ]
        },
    ],
})

router.beforeEach((to, from) => {
    Loading.show()
})
router.afterEach((to, from) => {
    Loading.hide()
})
router.beforeResolve(async (to, from, next) => {
    const userStore = useUserStore()

    if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !userStore.user) {
        await userStore.fetchUser()
    }
    if (to.meta.requiresAdmin && !userStore.isAdmin()) {
        return next({name: 'Home'})

    }

    next()
    document.title = `На связи | ${to.meta.title}`
})

export default router