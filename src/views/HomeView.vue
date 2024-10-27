<script setup>

import IconApple from "@/components/icons/IconApple.vue";
import IconXiaomi from "@/components/icons/IconXiaomi.vue";
import IconSamsung from "@/components/icons/IconSamsung.vue";
import IconDyson from "@/components/icons/IconDyson.vue";
import {onMounted, reactive, ref} from "vue";
import TagIcon from "@/assets/icons/tag/index.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import TagImages from "@/assets/images/tag/index.js";
import {breakpoints} from "@/mixins/breakpointsMixin.js";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";
import {Loading, Notify} from "quasar";
import AOS from 'aos';
import router from "@/router/index.js";


const getPayment = (subscriptionType) => {
  const userStore = useUserStore()
  if (userStore.user) {
    Loading.show()
    axios.post('/api/payments',{ subscriptionType })
        .then(res => {
          if (res.data.confirmation && res.data.confirmation.confirmation_url) {
            window.open(res.data.confirmation.confirmation_url,'_blank')
          } else {
            console.error('Confirmation URL not found in response')
          }
        })
        .catch(error => {
          console.error('Error during payment request:', error)
        })
        .finally(() => {
          Loading.hide()
        })
  } else {
    Notify.create({
      type: 'negative',
      message: 'Сначла нужно авторизоваться'
    })
    router.push({name: 'Login'})
  }
}

onMounted(() => {
  AOS.refresh()
})
const tagActive = ref(0);
const items = ref([
  {
    question: "Почему именно мы?",
    answer: "Мы предлагаем первую онлайн-франшизу в России, которая гарантирует быстрый старт без вложений в товар. Мы берём на себя все вопросы, создаем для вас готовую площадку для продаж и обучаем всему необходимому.",
    showAnswer: false
  },
  {
    question: "Как это работает?",
    answer: "<ul class='list-decimal pl-5'>\n" +
        "<li>Вы становитесь нашим партером, получаете всю информацию и проходите обучение.</li>\n" +
        "<li>Мы создаем для вас интернет-магазин на Авито, создаем уникальный дизайн, выгружаем объявления, настраиваем рекламу.</li>\n" +
        "<li>Вы получаете заказы и управляете своим бизнесом из любой точки мира.</li>\n" +
        "<li>Мы берем на себя всю рутину: обработку заказов, сортировку и отправку товаров клиентам.</li>\n" +
        "</ul>",
    showAnswer: false
  },
  {
    question: "Что такое дропшиппинг?",
    answer: "Дропшипинг — продажа товара без вложений.\n" +
        "Мы убираем барьер начальных инвестиций, позволяя вам продавать товары без их закупки.<br/>\n" +
        "Вы работаете с нашими складами, где мы храним товары Apple.\n" +
        "Покупатель оплачивает товар вам, а отправляем его мы.",
    showAnswer: false
  },
  {
    question: "Остались вопросы!",
    answer: "Если у вас остались дополнительные вопросы, свяжитесь с нами в WhatsApp/Telegram: +7 919 646 4843.",
    showAnswer: false
  }
])

const changeTag = (num) => {
  tagActive.value = num - 1
}

const tagItems = [
  {
    iconUrl: TagIcon.briefcase,
    title: 'Полностью готовый бизнес',
    text: 'Мы предоставим тебе готовый сайт, логотип, базу поставщиков, обучающие материалы и инструменты для массового постинга объявлений.',
    imgUrl: TagImages.image1
  },
  {
    iconUrl: TagIcon.gold,
    title: 'Гарантированный доход',
    text: 'Мы предоставим тебе инструменты и стратегии, которые позволят тебе получать стабильный доход с первого дня.',
    imgUrl: TagImages.image2
  },
  {
    iconUrl: TagIcon.receipt,
    title: 'Массовый постинг объявлений',
    text: 'Ты сможешь выкладывать 10 000 объявлений на Авито за 2 клика, что значительно увеличит твои шансы на продажи.',
    imgUrl: TagImages.image3
  },
  {
    iconUrl: TagIcon.panel,
    title: 'Масштабирование',
    text: 'Модель позволяет масштабировать бизнес и продавать любые товары на площадках без закупки. Ты можешь расширить свой ассортимент и увеличить доход.',
    imgUrl: TagImages.image4
  },
  {
    iconUrl: TagIcon.shield,
    title: 'Проверенная модель заработка: ',
    text: 'Мы уже проверили эту модель на практике и она приносит стабильный доход.',
    imgUrl: TagImages.image5
  },
  {
    iconUrl: TagIcon.apple,
    title: 'Огромный выбор товаров',
    text: 'У тебя будет доступ к огромному каталогу техники Apple, чтобы удовлетворить любые потребности клиентов.',
    imgUrl: TagImages.image6
  },
  {
    iconUrl: TagIcon.sitemap,
    title: 'Простой и понятный алгоритм',
    text: 'Мы все сделаем за тебя: настроим сайт, запустим рекламу, будем следить за заказами. Твоя задача только принимать заказы и контролировать процесс продажи.',
    imgUrl: TagImages.image7
  },
  {
    iconUrl: TagIcon.cloud,
    title: 'Без рисков',
    text: 'Мы предоставим тебе гарантию возврата денег, если ты не будешь удовлетворен результатами.',
    imgUrl: TagImages.image8
  }
];
const myForm = ref(null)
const myForm2 = ref(null)
const formData = reactive({
  firstName: "",
  surname: "",
  phone: "",
  companyName: "",
})

const onSubmit = () => {
  Loading.show()
  axios.get('/sanctum/csrf-cookie').then(response => {
    formData.phone = formData.phone.replace(/[^0-9]/g, '')
    axios.post('/api/send_mail', formData).then(res => {
      formData.firstName = ''
      formData.surname = ''
      formData.phone = ''
      formData.companyName = ''
      myForm.value.reset()
      myForm2.value.reset()
      Notify.create({
        type: 'positive',
        message: 'Сообщение отправлено. Ожидайте ответа.'
      })

    }).catch((error) => {

      if (error.status === 422) {
        Notify.create({
          type: 'negative',
          message: error.response.data.message
        })
      } else {
        Notify.create({
          type: 'negative',
          message: error.message
        })
      }
    }).finally(() => {
      Loading.hide()
    })
  });

}
</script>

<template>
  <DefaultLayout>
    <section class="mt-8 relative">
      <div class="container">
        <div class="flex-col relative">
          <div class="h-8 md:hidden"></div>
          <div
              class="rounded-3xl relative bg-cover bg-center background-text py-32 px-16 md:py-16 md:px-8 sm:py-8 sm:px-4">
            <div class="max-w-[680px] ">
              <div>
                <div class="text-white">
                  <h1
                      data-aos="fade-up"
                      data-aos-offset="200"
                      data-aos-delay="450"
                      data-aos-duration="200"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top"
                      class="text-bold text-6xl max-w-[800px] lg:text-4xl sm:text-2xl">Первая онлайн франшиза в
                    России!</h1>
                  <p
                      data-aos="fade-right"
                      data-aos-offset="200"
                      data-aos-delay="300"
                      data-aos-duration="250"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="true"
                      data-aos-anchor-placement="top"
                      class="text-xl mt-4 max-w-[550px] lg:text-lg sm:text-sm sm:mt-2">
                    <span class="text-bold">Готовый</span> бизнес <span class="text-bold">без вложений</span> в товар, с
                    базой поставщиков, обущающими матераилами и др.
                  </p>
                </div>
                <div class="mt-4"
                     data-aos="fade-right"
                     data-aos-offset="250"
                     data-aos-delay="350"
                     data-aos-duration="300"
                     data-aos-easing="ease-in-out"
                     data-aos-mirror="true"
                     data-aos-once="true"
                     data-aos-anchor-placement="top"
                >
                  <router-link
                      class="bg-white text-c-blue-1 font-bold block w-64 py-4 mt-4 cursor-pointer rounded-xl text-center md:py-2 sm:w-36 sm:text-sm sm:rounded-lg"
                      :to="{name:'Home',hash:'#feedback'}">Стать партнером
                  </router-link>
                </div>
                <div class="mt-12 flex text-white gap-8 sm:gap-2 sm:mt-4 sm:flex-nowrap sm:justify-between">
                  <div class="flex flex-col gap-1"
                       data-aos="fade-up"
                       data-aos-offset="300"
                       data-aos-delay="400"
                       data-aos-duration="350"
                       data-aos-easing="ease-in-out"
                       data-aos-mirror="true"
                       data-aos-once="true"
                       data-aos-anchor-placement="center"
                  >
                    <div class="text-bold text-5xl font2 sm:text-4xl">100+</div>
                    <div class="sm:text-sm">Партнеров</div>
                  </div>
                  <div class="flex flex-col gap-1"
                       data-aos="fade-up"
                       data-aos-delay="500"
                       data-aos-duration="500"
                       data-aos-once="true"

                  >
                    <div class="text-bold text-5xl font2 sm:text-4xl">25000+</div>
                    <div class="sm:text-sm sm:max-w-[130px]">Доход партнеров в неделю</div>
                  </div>
                </div>
              </div>

            </div>
            <div class="absolute-top-left w-full h-full -z-10 bg-c-blue-1 rounded-3xl"></div>
          </div>
          <img
              data-aos="fade-up"
              data-aos-offset="150"
              data-aos-delay="150"
              data-aos-duration="150"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top"
              src="@/assets/images/girl.png" alt="girl" class="absolute top-0 right-10 h-full md:hidden ">
        </div>
      </div>
    </section>

    <section class="border-b p-16 border-b-c-gray-1 sm:px-0 sm:py-8" id="brands"
             data-aos="fade-up"
             data-aos-offset="200"
             data-aos-delay="450"
             data-aos-duration="100"
             data-aos-easing="ease-in-out"
             data-aos-mirror="true"
             data-aos-once="true"
             data-aos-anchor-placement="top"
    >
      <div class="container">
        <div>
          <div class="grid grid-cols-4 mx-auto gap-4 justify-center items-center lg:grid-cols-2 lg:gap-y-8">
            <a href="" class="mx-auto ">
              <icon-apple class="sm:max-w-[100px]"/>
            </a>
            <a href="" class="mx-auto ">
              <icon-samsung class="sm:max-w-[100px]"/>
            </a>
            <a href="" class="mx-auto ">
              <icon-xiaomi class="sm:max-w-[100px]"/>
            </a>
            <a href="" class="mx-auto ">
              <icon-dyson class="sm:max-w-[100px]"/>
            </a>
          </div>
          <!--          <div class="flex items-center justify-around gap-10 mt-20 sm:flex-col sm:gap-4">-->
          <!--            <div class="background-with-text px-12 py-8 rounded-xl  md:px-8 relative border-2 border-c-black-5 sm:w-full">-->
          <!--              <div class="text-bold text-lg sm:text-center ">База поставщиков</div>-->
          <!--              <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-xl"></div>-->
          <!--            </div>-->
          <!--            <div class="background-with-text px-12 py-8 rounded-xl  md:px-8 relative border-2 border-c-black-5 sm:w-full">-->
          <!--              <div class="text-bold text-lg sm:text-center">Гарантия дохода</div>-->
          <!--              <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-xl"></div>-->
          <!--            </div>-->
          <!--            <div class="background-with-text px-12 py-8 rounded-xl  md:px-8 relative border-2 border-c-black-5 sm:w-full">-->
          <!--              <div class="text-bold text-lg sm:text-center">Поддержка кураторов</div>-->
          <!--              <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-xl"></div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </section>

    <section class="py-12"
             data-aos="fade-up"
             data-aos-offset="200"
             data-aos-delay="450"
             data-aos-duration="300"
             data-aos-easing="ease-in-out"
             data-aos-mirror="true"
             data-aos-once="true"
             data-aos-anchor-placement="top"
    >
      <div class="container">
        <h2 class="max-w-[500px] font-medium text-4xl sm:text-3xl sm:max-w-[250px]"><span class="text-bold">На связи - лучший выбор</span>
          для старта франшизы
        </h2>

        <div class="tag"
             data-aos="fade-up"
             data-aos-offset="200"
             data-aos-delay="450"
             data-aos-duration="200"
             data-aos-easing="ease-in-out"
             data-aos-mirror="true"
             data-aos-once="true"
             data-aos-anchor-placement="top"
        >
          <div class="grid grid-cols-4 gap-4 text-center mt-12 lg:grid-cols-2 ">
            <div @click="changeTag(1)" :class="[tagActive === 0 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Готовый бизнес
            </div>
            <div @click="changeTag(2)" :class="[tagActive === 1 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Гарантия дохода
            </div>
            <div @click="changeTag(3)" :class="[tagActive === 2 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Массовый постинг
            </div>
            <div @click="changeTag(4)" :class="[tagActive === 3 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Масштабирование
            </div>
            <div @click="changeTag(5)" :class="[tagActive === 4 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer col-span-2  rounded-xl py-2 px-6 text-bold sm:px-2 lg:order-1">Проверенная модель
              заработка
            </div>
            <div @click="changeTag(6)" :class="[tagActive === 5 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer col-span-2  rounded-xl py-2 px-6 text-bold sm:px-2 lg:order-2">Огромный выбор
              товаров
            </div>
            <div @click="changeTag(7)" :class="[tagActive === 6 ? 'bg-c-gr6ay-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Простой алгоритм
            </div>
            <div @click="changeTag(8)" :class="[tagActive === 7 ? 'bg-c-gray-2' : 'bg-c-gray-3']"
                 class="cursor-pointer  rounded-xl py-2 px-6 text-bold sm:px-2">Без рисков
            </div>
          </div>

          <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="450"
              data-aos-duration="300"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top"
              class="mt-6">
            <div class="row gap-4">
              <div class="col flex flex-col  justify-between">
                <div class="grow">
                  <div class="bg-c-gray-1 rounded-xl h-full  px-8 md:px-4 sm:pb-12">
                    <img alt="Icon" class="relative -left-8 bg-white p-2 lg:max-w-[50px] md:max-w-[40px] md:-left-4"
                         :src=tagItems[tagActive].iconUrl>
                    <h3 class="text-xl text-bold mt-8 lg:mt-4 lg:text-lg md:text-base md:mt-2">
                      {{ tagItems[tagActive].title }}</h3>
                    <div class="mt-2 text-lg lg:text-sm">{{ tagItems[tagActive].text }}</div>
                  </div>
                </div>
                <router-link
                    class="bg-c-blue-2 text-white font-bold block w-full py-4 mt-4 rounded-xl text-center md:py-2"
                    :to="{name:'Home',hash:'#feedback'}">Узнать
                  больше
                  подробностей
                </router-link>
              </div>
              <div class="col-5 sm:hidden"><img class="w-full block h-full" :src=tagItems[tagActive].imgUrl
                                                alt="Image"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="py-10 bg-c-gray-3"
             data-aos="fade-up"
             data-aos-offset="200"
             data-aos-delay="450"
             data-aos-duration="300"
             data-aos-easing="ease-in-out"
             data-aos-mirror="true"
             data-aos-once="true"
             data-aos-anchor-placement="top-center"
    >
      <div class="container">
        <div class="flex no-wrap justify-between sm:!flex-wrap">
          <h2 class="max-w-[446px] text-6xl lg:text-5xl md:text-3xl"><span class="text-bold">Что для этого</span>
            нужно?</h2>
          <div
              class="flex flex-col max-w-[540px] gap-8 lg:max-w-[400px] sm:mt-6 sm:gap-4 sm:mx-auto">
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="450"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-c-gray-2 rounded-xl px-8 py-8 md:px-4 md:py-4">
              <div

                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white md:w-6 md:h-6 md:text-base">

                1
              </div>
              <h3 class="mt-8 text-lg text-bold md:mt-4">Создать Авито аккаунт</h3>
              <div class="mt-4 text-lg md:text-base md:mt-2">Мы создаем для вас готовый интернет-магазин на Авито и
                обучаем вас всему
                необходимому.
              </div>
            </div>
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="450"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-c-gray-2 rounded-xl px-8 py-8 md:px-4 md:py-4">
              <div
                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white md:w-6 md:h-6 md:text-base">
                2
              </div>
              <h3 class="mt-8 text-lg text-bold md:mt-4">Загрузить таблицу с объявлениями</h3>
              <div class="mt-4 text-lg md:text-base md:mt-2">Таблица XML на 5000 объявлений с описанием и фото.</div>
            </div>
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="450"
                data-aos-duration="600"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-c-gray-2 rounded-xl px-8 py-8 md:px-4 md:py-4">
              <div
                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white md:w-6 md:h-6 md:text-base">
                3
              </div>
              <h3 class="mt-8 text-lg text-bold md:mt-4">Изучить инструкцию по продажам</h3>
              <div class="mt-4 text-lg md:text-base md:mt-2">Мы предоставим тебе пошаговые инструкции по открытию
                интернет-магазина на Авито
                и все необходимые
                инструменты.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="450"
        data-aos-duration="300"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        class="py-16">
      <div class="container">
        <div class="flex items-center gap-10 sm:gap-4">
          <h2 class="max-w-[540px] text-5xl lg:text-4xl"><span class="font-bold">Мы - команда</span>
            <br>с опытом работы</h2>
          <div class="text-4xl text-white bg-c-blue-2 rounded-2xl px-8 py-2 -rotate-12 lg:text-2xl sm:-rotate-2 ">Более
            <span class="font-bold">пяти лет</span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-8 md:grid-cols-2 sm:grid-cols-1">
          <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/1.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4 ">Импорт техники</h3>
            <div class="text-md mt-2">Шесть лет мы импортируем технику из Японии и ОАЭ и помогли открыть более 200
              онлайн-магазинов.
            </div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/2.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Прибыль</h3>
            <div class="text-md mt-2">Средняя прибыль с одной сделки составляет 7500 рублей, а наши партнеры уже в
              первую неделю зарабатывают
              от 25 000 рублей!
            </div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-delay="700"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/3.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Инструкции</h3>
            <div class="text-md mt-2">Мы предоставляем пошаговые инструкции по открытию интернет-магазина на Авито и все
              необходимые
              инструменты.
            </div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-delay="900"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/4.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Первые в России</h3>
            <div class="text-md mt-2">Представляем тебе готовую франшизу интернет-магазина на Авито - один из первых
              подобных продуктов в
              России!
            </div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-delay="1100"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/5.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Наша франшиза</h3>
            <div class="text-md mt-2">Это идеальный способ стать успешным предпринимателем в сфере продаж техники Apple
              без рисков и с
              максимальной поддержкой!
            </div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-delay="1300"
              data-aos-duration="200"
              class="p-6 border-2 border-c-gray-1 rounded-xl">
            <img src="@/assets/icons/info/6.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Дропшиппинг</h3>
            <div class="text-md mt-2">Это бизнес-модель, которая позволяет тебе продавать товары без необходимости их
              закупать и хранить на
              своем складе. Ты просто принимаешь заказы от клиентов, а поставщик отправляет товар прямо клиенту.
            </div>
          </div>
        </div>
      </div>

    </section>
    <section
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="450"
        data-aos-duration="300"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        class="py-20 sm:py-10" style="background: linear-gradient(to bottom, #F4F7FA 60%,white 40%);">
      <div class="container">
        <div
            class="flex gap-12 no-wrap">
          <div class="max-w-[545px] lg:max-w-[420px] md:max-w-[350px]">
            <h2 class="text-5xl lg:text-4xl">Немного о
              <span class="font-bold">нашем магазине</span></h2>
            <div class="mt-4 text-lg lg:text-sm">Мы занимаемся продажей оригинальной техники ведущих брендов с начала
              2018 года.
              Все это время мы
              стремимся радовать свою аудиторию самыми лучшими ценами и условиями.
            </div>
            <div class="mt-8 px-4 sm:flex sm:justify-between ">
              <img class="sm:max-w-[155px] rounded-3xl border-2 border-c-black-5 border-solid"
                   src="@/assets/images/photo2.jpg" alt="photo2">
              <img class="img-photo1 sm:max-w-[155px] rounded-3xl border-2 border-c-black-5 border-solid"
                   src="@/assets/images/photo1.jpg" alt="photo1">
            </div>
          </div>
          <div class="sm:hidden">
            <img class="rounded-3xl border-2 border-c-black-5 border-solid" src="@/assets/images/photo1.jpg"
                 alt="photo1">
          </div>
        </div>
      </div>
    </section>
    <section
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="450"
        data-aos-duration="200"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
    >
      <div class="container">
        <div
            class="background-with-text-large px-8 py-8 rounded-3xl md:px-4 md:py-6 relative border-2 border-c-black-5">
          <h2 class="text-5xl lg:text-4xl md:text-3xl">Что нужно <span class="font-bold">для старта?</span></h2>
          <div class="mt-12 flex justify-between  no-wrap gap-4 md:mt-4 sm:!flex-wrap">
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="450"
                data-aos-duration="200"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-white px-4 py-4 rounded-xl flex flex-col justify-between">
              <div><img src="@/assets/icons/start/1.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6 md:mt-2 md:text-base">Желание зарабатывать</h3>
              <div class="mt-2">(70% от чистой прибыли с каждого заказа)</div>
            </div>
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="450"
                data-aos-duration="250"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-white px-4 py-4 rounded-xl flex flex-col justify-between">
              <div><img src="@/assets/icons/start/2.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6 md:mt-2 md:text-base">Оплата тарифа Авито</h3>
              <div class="mt-2">Стоимость тарифа всего 2.000 рублей в месяц.</div>
            </div>
            <div
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="400"
                data-aos-duration="300"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                data-aos-anchor-placement="top"
                class="bg-white px-4 py-4 rounded-xl flex flex-col justify-between">
              <div><img src="@/assets/icons/start/3.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6 md:mt-2 md:text-base">Оплата комиссии</h3>
              <div class="mt-2">0,4 по тарифу за обработку заказа в авито - копейки.</div>
            </div>
          </div>
          <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-3xl"></div>
        </div>
      </div>
    </section>
    <section
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="450"
        data-aos-duration="300"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        class="py-16" id="services">
      <div class="container">
        <div>
          <div class="flex items-center gap-10 sm:gap-4">
            <h2 class="max-w-[400px] text-5xl lg:text-4xl">Запускай <span class="lg:block font-bold">свой бизнес</span>
            </h2>
            <div class="text-4xl text-white bg-c-blue-2 rounded-2xl px-8 py-2 -rotate-12 lg:text-2xl sm:-rotate-2 ">с
              <span class="font-bold">НаСвязи</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-16 mt-12 lg:gap-y-8 sm:grid-cols-1">
          <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="450"
              data-aos-duration="300"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              class="flex flex-col service-background-1 rounded-3xl px-8 py-8 relative lg:px-6 md:px-4 border-2 border-c-black-5">
            <h4 class="font-bold text-2xl">Тариф “Партнер”</h4>
            <div class="text-xl mt-6 lg:text-lg md:mt-2"><span class="font-bold">₽</span> <span
                class="text-c-blue-1 font-bold text-5xl font2">19.000</span> / мес.
            </div>
            <div class="pl-4 mt-8 text-lg lg:text-base lg:mt-4 md:pl-2 md:text-sm ">
              <ul class="list-disc pl-5">
                <li>База поставщиков техники Apple;</li>
                <li>Обучающий материал по дропшиппингу;</li>
                <li>Таблица XML на 5000 объявлений с описанием и фото;</li>
                <li>Полное оформление твоего магазина;</li>
                <li>Поддержка от наших кураторов;</li>
                <li>Обучающее видео по автоматизации постинга объявлений;</li>
              </ul>
              <ul class="list-disc pl-5 line-through">
                <li class="opacity-90">Полное наполнение магазина товарами;</li>
                <li class="opacity-80">Выкладка более 3500 объявлений;</li>
                <li class="opacity-70">Индивидуальный наставник ;</li>
                <li class="opacity-60">Доступ к кредитованию товаров;</li>
                <li class="opacity-50">Партнерство с кураторами и наставниками;</li>
                <li class="opacity-40">Создание собственного бренда;</li>
                <li class="opacity-20">Выход на физический магазин;</li>
                <li class="opacity-10">Доступ к складу техники Apple.</li>
              </ul>
            </div>
            <button @click="getPayment(1)"
                    class="rounded-2xl w-full text-white text-center py-4 mt-8 font-bold text-md bg-c-blue-2">Запустить
              франшизу
            </button>
            <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-3xl"></div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="450"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              class="flex flex-col service-background-2 rounded-3xl px-8 py-8 lg:px-6 md:px-4 relative border-2 border-c-black-5">
            <h4 class="font-bold text-2xl">Тариф “Под ключ”</h4>
            <div class="text-xl mt-6 md:mt-2"><span class="font-bold">₽</span> <span
                class="text-c-blue-1 font-bold text-5xl font2">24.000</span> / мес.
            </div>
            <div class="pl-4 mt-8 text-lg lg:text-base lg:mt-4 md:pl-2 md:text-sm">
              <ul class="list-disc pl-5 ">
                <li>База поставщиков техники Apple;</li>
                <li>Обучающий материал по дропшиппингу;</li>
                <li>Таблица XML на 5000 объявлений с описанием и фото;</li>
                <li>Полное оформление твоего магазина;</li>
                <li>Поддержка от наших кураторов;</li>
                <li>Обучающее видео по автоматизации постинга объявлений;</li>
                <li>Полное наполнение магазина товарами;</li>
                <li>Выкладка более 3500 объявлений;</li>
                <li>Индивидуальный наставник ;</li>
                <li>Доступ к кредитованию товаров;</li>
                <li>Партнерство с кураторами и наставниками;</li>
                <li>Создание собственного бренда;</li>
                <li>Выход на физический магазин;</li>
                <li>Доступ к складу техники Apple.</li>
              </ul>
            </div>
            <button @click='getPayment(2)'
                    class="rounded-2xl w-full text-white text-center py-4 mt-8 font-bold text-md bg-c-blue-2">Запустить
              франшизу
            </button>
            <div class="absolute-top-left w-full h-full -z-10 bg-c-gray-6 rounded-3xl"></div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="450"
              data-aos-duration="300"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              class="relative">
            <img src="@/assets/images/services/3.png" class="w-full max-h-[600px]" alt="photo">
            <div class="text-white text-5xl top-8 left-8 absolute lg:text-3xl">Присоединяйся
              <span class="font-bold">сейчас</span></div>
          </div>
          <div
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="450"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              id="feedback" class="p-2 border-2 border-c-black-5 rounded-3xl">
            <div class="pl-12 pr-4 py-4 bg-white flex no-wrap justify-between items-center w-full lg:pl-4 md:pl-2">
              <div class="max-w-[300px] w-full">
                <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit" ref="myForm2">
                  <h3 class="text-2xl mb-8 font-bold lg:mb-4 md:text-lg">Стать партнером:</h3>
                  <q-input
                      v-model="formData.firstName"
                      outlined
                      :dense="breakpoints.isSmaller('lg')"
                      hide-bottom-space
                      :rules="[val => !!val ]"
                      label="Имя*"
                      required
                  />
                  <q-input
                      v-model="formData.surname"
                      :dense="breakpoints.isSmaller('lg')"
                      :rules="[val => !!val]"
                      outlined
                      hide-bottom-space
                      label="Фамилия*"
                  />
                  <q-input
                      v-model="formData.phone"
                      :dense="breakpoints.isSmaller('lg')"
                      :rules="[val => !!val]"
                      outlined
                      required
                      hide-bottom-space
                      mask="7 (###) ### - ####" label="Номер телефона*"
                  />
                  <q-input
                      v-model="formData.companyName"
                      outlined
                      :dense="breakpoints.isSmaller('lg')"
                      hide-bottom-space
                      label="Название компании"/>

                  <button class="bg-c-blue-1 text-white text-lg font-bold px-6 py-2 mt-6">Связаться</button>
                  <div class="text-center text-xs mt-8 font-extralight">Помощь:
                    <a class="text-c-blue-1"
                       href="https://t.me/na_svyazi_manager">t.me/na_svyazi_manager</a>
                  </div>
                </q-form>
              </div>
              <div>
                <img src="@/assets/images/illustration.png" alt="illustrtaion">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="450"
        data-aos-duration="300"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
        class="py-20 bg-c-gray-3 sm:py-10" id="faqs">
      <div class="container">
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="450"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top"
            class="flex justify-between no-wrap sm:!flex-wrap">
          <h2 class="text-5xl lg:text-3xl"><span class="font-bold">Ответы</span><br>
            на вопросы:</h2>
          <div class="flex flex-col max-w-[600px] w-full lg:max-w-[550px] sm:mt-4">
            <div class="">
              <div
                  v-for="(item, index) in items" :key="index" @click="item.showAnswer = !item.showAnswer"
                  class="cursor-pointer relative mb-4 bg-c-gray-2 px-8 py-4 rounded-xl sm:px-4">
                <div class=" text-md font-bold">
                  {{ item.question }}
                </div>
                <transition name="fade">
                  <div v-if="item.showAnswer" class="mt-4" v-html="item.answer">
                  </div>
                </transition>
                <template v-if="item.showAnswer">
                  <q-icon class="absolute right-4 top-3" color="c-blue-1" size="32px" name="keyboard_arrow_up"></q-icon>
                </template>
                <template v-else>
                  <q-icon class="absolute right-4 top-3" color="c-blue-1" size="32px"
                          name="keyboard_arrow_down"></q-icon>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.bg-image {
  background-image: url('@/assets/images/bg-main.jpg');
  background-size: cover;
  background-position: center;
}

.background-with-text {
  background-image: url('@/assets/images/background-with-text.png');
  background-size: cover;
  background-position: center;
}

.background-with-text-large {
  background-image: url('@/assets/images/background-with-text-large.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}

.background-text {
  background-image: url('@/assets/images/bg-text.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}

.service-background-1 {
  background-image: url('@/assets/images/services/1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}

.service-background-2 {
  background-image: url('@/assets/images/services/2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.img-photo1 {
  display: none;
}

@media (max-width: 639px) {
  .img-photo1 {
    display: block;
  }

  .background-text {
    background-size: contain;
  }
}

</style>