<script setup>

import AppHeader from "@/components/AppHeader.vue";
import IconApple from "@/components/icons/IconApple.vue";
import IconSamsung from "@/components/icons/IconSamsung.vue";
import IconXiaomi from "@/components/icons/IconXiaomi.vue";
import IconDyson from "@/components/icons/IconDyson.vue";
import {ref} from "vue";
import TagIcon from "@/assets/icons/tag/index.js"
import AppFooter from "@/components/AppFooter.vue";

const tagActive = ref(0);
const  items = ref([
  {
    question: "Почему именно мы?",
    answer: "Мы создаем для вас готовый интернет-магазин на Авито и обучаем вас всему необходимому.",
    showAnswer:false
  },
  {
    question: "Как это работает?",
    answer: "<ul class='list-decimal pl-5'>\n" +
        "<li>Вы становитесь нашим партнером.</li>\n" +
        "<li>Мы создаем для вас готовый интернет-магазин на Авито и обучаем вас всему необходимому.</li>\n" +
        "<li>Вы получаете заказы и управляете своим бизнесом из любой точки мира.</li>\n" +
        "<li>Мы берем на себя всю рутину: обработку заказов, сортировку и отправку товаров клиентам.</li>\n" +
        "</ul>",
    showAnswer:false
  },
  {
    question: "Что такое дропшиппинг?",
    answer: "Мы создаем для вас готовый интернет-магазин на Авито и обучаем вас всему необходимому.",
    showAnswer:false
  },
  {
    question: "У меня всё еще остались вопросы!",
    answer: "Мы создаем для вас готовый интернет-магазин на Авито и обучаем вас всему необходимому.",
    showAnswer:false
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
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.gold,
    title: 'Гарантированный доход',
    text: 'Мы предоставим тебе инструменты и стратегии, которые позволят тебе получать стабильный доход с первого дня.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.receipt,
    title: 'Массовый постинг объявлений',
    text: 'Ты сможешь выкладывать 10 000 объявлений на Авито за 2 клика, что значительно увеличит твои шансы на продажи.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.panel,
    title: 'Масштабирование',
    text: 'Модель позволяет масштабировать бизнес и продавать любые товары на площадках без закупки. Ты можешь расширить свой ассортимент и увеличить доход.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.shield,
    title: 'Проверенная модель заработка: ',
    text: 'Мы уже проверили эту модель на практике и она приносит стабильный доход.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.apple,
    title: 'Огромный выбор товаров',
    text: 'У тебя будет доступ к огромному каталогу техники Apple, чтобы удовлетворить любые потребности клиентов.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.sitemap,
    title: 'Простой и понятный алгоритм',
    text: 'Мы все сделаем за тебя: настроим сайт, запустим рекламу, будем следить за заказами. Твоя задача только принимать заказы и контролировать процесс продажи.',
    imgUrl: ''
  },
  {
    iconUrl: TagIcon.cloud,
    title: 'Без рисков',
    text: 'Мы предоставим тебе гарантию возврата денег, если ты не будешь удовлетворен результатами.',
    imgUrl: ''
  }
];
</script>

<template>
  <AppHeader/>
  <main>
    <section>
      <div class="relative bg-cover bg-center h-screen bg-main pt-60">
        <div class="container">
          <div class="text-white">
            <h1 class="text-bold text-6xl max-w-[800px]">Первая онлайн франшиза в России!</h1>
            <p class="text-2xl mt-4 max-w-[550px]">
              Готовый бизнес без вложений в товар, с сайтом, логотипом, базой поставщиков, обучающими материалами,
              инструментами для массового постинга объявлений и многим другим.
            </p>
          </div>
          <div class="mt-12">
            <a href="" class="flex items-center">
              <p class="text-white text-lg font-bold mr-2 my-0">Подробнее</p>
              <q-icon color="white" size="24px" name="o_expand_circle_down"></q-icon>
            </a>
          </div>

        </div>
      </div>

    </section>

    <section class="border-b p-16 border-b-c-gray-1">
      <div class="container">
        <div>
          <div class="flex items-center justify-around">
            <a href="">
              <icon-apple/>
            </a>
            <a href="">
              <icon-samsung/>
            </a>
            <a href="">
              <icon-xiaomi/>
            </a>
            <a href="">
              <icon-dyson/>
            </a>
          </div>
          <div class="flex items-center justify-between mt-20 ">
            <div class="background-with-text px-12 py-8 rounded-lg text-bold text-lg">База поставщиков</div>
            <div class="background-with-text px-12 py-8 rounded-lg text-bold text-lg">База поставщиков</div>
            <div class="background-with-text px-12 py-8 rounded-lg text-bold text-lg">База поставщиков</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="container">
        <h2 class="max-w-[820px] font-medium"><span class="text-bold">На связи - лучший выбор</span>
          для старта франшизы
        </h2>

        <div class="tag">
          <div class="grid grid-cols-4 gap-4 text-center mt-12">
            <div @click="changeTag(1)" :class="[tagActive === 0 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Готовый бизнес</div>
            <div @click="changeTag(2)" :class="[tagActive === 1 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Гарантия дохода</div>
            <div @click="changeTag(3)" :class="[tagActive === 2 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Массовый постинг</div>
            <div @click="changeTag(4)" :class="[tagActive === 3 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Масштабирование</div>
            <div @click="changeTag(5)" :class="[tagActive === 4 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer col-span-2  rounded-xl py-2 px-6 text-bold">Проверенная модель
              заработка
            </div>
            <div @click="changeTag(6)" :class="[tagActive === 5 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer col-span-2  rounded-xl py-2 px-6 text-bold">Огромный выбор
              товаров
            </div>
            <div @click="changeTag(7)" :class="[tagActive === 6 ? 'bg-c-gr6ay-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Простой алгоритм</div>
            <div @click="changeTag(8)" :class="[tagActive === 7 ? 'bg-c-gray-2' : 'bg-c-gray-3']" class="cursor-pointer  rounded-xl py-2 px-6 text-bold">Без рисков</div>
          </div>

          <div class="mt-6">
            <div class="row gap-4">
              <div class="col">
                <div>
                  <div class="bg-c-gray-1 rounded-xl relative py-20 px-8">
                    <img alt="Icon " class="absolute-top-left bg-white p-2" :src=tagItems[tagActive].iconUrl></img>
                    <h3 class="text-xl text-bold mt-8">{{ tagItems[tagActive].title }}</h3>
                    <div class="mt-2 text-lg">{{ tagItems[tagActive].text }}</div>
                  </div>
                </div>
                <a href="" class="bg-blue-2 block w-full py-4 mt-4 rounded-xl text-center">Узнать более подробнее</a>
              </div>
              <div class="col-4"><img class="w-full block h-full" src="@/assets/images/tag/1.jpg" alt="Image"/></div>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="py-10 bg-c-gray-3">
      <div class="container">
        <div class="flex no-wrap justify-between">
          <h2 class="max-w-[446px] text-6xl"><span class="text-bold">Что для этого</span>
            нужно?</h2>
          <div class="flex flex-col max-w-[540px] gap-8">
            <div class="bg-c-gray-2 rounded-xl px-8 py-8">
              <div
                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white">
                1
              </div>
              <h3 class="mt-8 text-lg text-bold">Создать Авито аккаунт</h3>
              <div class="mt-4 text-lg">Мы создаем для вас готовый интернет-магазин на Авито и обучаем вас всему
                необходимому.
              </div>
            </div>
            <div class="bg-c-gray-2 rounded-xl px-8 py-8">
              <div
                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white">
                2
              </div>
              <h3 class="mt-8 text-lg text-bold">Загрузить таблицу с объявлениями</h3>
              <div class="mt-4 text-lg">Таблица XML на 5000 объявлений с описанием и фото.</div>
            </div>
            <div class="bg-c-gray-2 rounded-xl px-8 py-8">
              <div
                  class="bg-c-blue-2  w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full text-white">
                3
              </div>
              <h3 class="mt-8 text-lg text-bold">Изучить инструкцию по продажам</h3>
              <div class="mt-4 text-lg">Мы предоставим тебе пошаговые инструкции по открытию интернет-магазина на Авито
                и все необходимые
                инструменты.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16">
      <div class="container">
        <div class="flex items-center gap-10">
          <h2 class="max-w-[540px]"><span class="font-bold">Мы - команда</span>
            <br>с опытом работы</h2>
          <div class="text-4xl text-white bg-c-blue-2 rounded-2xl px-8 py-2 -rotate-12">Более <span class="font-bold">пяти лет</span>
          </div>
        </div>
        <div class="flex flex-start gap-4 mt-8">
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[370px]">
            <img src="@/assets/icons/info/1.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4 ">Импорт техники</h3>
            <div class="text-lg mt-2">Столько лет мы импортируем технику из Японии и ОАЭ и помогли открыть более 200
              онлайн-магазинов.
            </div>
          </div>
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[320px]">
            <img src="@/assets/icons/info/2.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Прибыль</h3>
            <div class="text-md mt-2">Средняя прибыль с одной сделки составляет 7500 рублей, а наши партнеры уже в
              первую неделю зарабатывают
              от 25 000 рублей!
            </div>
          </div>
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[320px]">
            <img src="@/assets/icons/info/3.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Инструкции</h3>
            <div class="text-md mt-2">Мы предоставляем пошаговые инструкции по открытию интернет-магазина на Авито и все
              необходимые
              инструменты.
            </div>
          </div>
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[320px]">
            <img src="@/assets/icons/info/4.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Первые в России</h3>
            <div class="text-md mt-2">Представляем тебе готовую франшизу интернет-магазина на Авито - один из первых
              подобных продуктов в
              России!
            </div>
          </div>
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[320px]">
            <img src="@/assets/icons/info/5.svg" alt="Icon">
            <h3 class="text-lg font-bold mt-4">Наша франшиза</h3>
            <div class="text-md mt-2">Это идеальный способ стать успешным предпринимателем в сфере продаж техники Apple
              без рисков и с
              максимальной поддержкой!
            </div>
          </div>
          <div class="p-6 border-2 border-c-gray-1 rounded-xl max-w-[320px]">
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
    <section style="background: linear-gradient(to bottom, #F4F7FA 60%,white 40%);">
      <div class="container">
        <div class="flex gap-12 no-wrap">
          <div class="max-w-[545px]">
            <h2>Немного о
              <span class="font-bold">нашем магазине</span></h2>
            <div class="mt-4 text-lg">Мы занимаемся продажей оригинальной техники ведущих брендов с начала 2018 года.
              Все это время мы
              стремимся радовать свою аудиторию самыми лучшими ценами и условиями.
            </div>
            <div class="mt-8 px-4 "><img src="@/assets/images/photo2.jpg" alt="photo2"></div>
          </div>
          <div>
            <img src="@/assets/images/photo1.jpg" alt="photo1">
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="background-with-text-large px-8 py-8 rounded-3xl">
          <h2 class="text-5xl">Что нужно <span class="font-bold">для старта?</span></h2>
          <div class="mt-12 flex justify-between  no-wrap gap-4">
            <div class="bg-white px-4 py-4 rounded-xl">
              <div><img src="@/assets/icons/start/1.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6">Желание зарабатывать</h3>
              <div class="mt-2">(70% от чистой прибыли с каждого заказа)</div>
            </div>
            <div class="bg-white px-4 py-4 rounded-xl">
              <div><img src="@/assets/icons/start/2.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6">Оплата тарифа Авито</h3>
              <div class="mt-2">Стоимость тарифа всего 2.000 рублей в месяц.</div>
            </div>
            <div class="bg-white px-4 py-4 rounded-xl">
              <div><img src="@/assets/icons/start/3.svg" alt="icon"></div>
              <h3 class="text-lg font-bold mt-6">Оплата комиссии</h3>
              <div class="mt-2">0,4 по тарифу за обработку заказа в авито - копейки.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-16" id="services">
      <div class="container">
        <div>
          <div class="flex items-center gap-10">
            <h2 class="max-w-[400px]">Запускай <span class="font-bold">свой бизнес</span></h2>
            <div class="text-4xl text-white bg-c-blue-2 rounded-2xl px-8 py-2 -rotate-12">с <span class="font-bold">НаСвязи</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4 gap-y-16 mt-12">
          <div class="flex flex-col service-background-1 rounded-3xl px-8 py-8 relative">
            <h4 class="font-bold">Тариф “Партнер”</h4>
            <div class="text-xl mt-6"><span class="font-bold">₽</span> <span
                class="text-c-blue-1 font-bold text-3xl">19.000</span> / мес.
            </div>
            <div class="pl-4 mt-8 text-lg ">
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
            <a href="" class="rounded-2xl w-full text-white text-center py-4 mt-8 font-bold text-md bg-c-blue-2">Запустить франшизу</a>
          </div>
          <div class="flex flex-col service-background-2 rounded-3xl px-8 py-8">
            <h4 class="font-bold">Тариф “Под ключ”</h4>
            <div class="text-xl mt-6"><span class="font-bold">₽</span> <span
                class="text-c-blue-1 font-bold text-3xl">24.000</span> / мес.
            </div>
            <div class="pl-4 mt-8 text-lg">
              <ul class="list-disc pl-5">
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
            <a href="" class="rounded-2xl w-full text-white text-center py-4 mt-8 font-bold text-md bg-c-blue-2">Запустить франшизу</a>
          </div>
          <div class="relative">
            <img src="@/assets/images/services/3.png" alt="photo">
            <div class="text-white text-5xl top-8 left-8 absolute">Присоединяйся
              <span class="font-bold">сейчас</span></div>
          </div>
          <div id="feedback">4</div>
        </div>
      </div>
    </section>
    <section class="py-20 bg-c-gray-3" id="faqs">
      <div class="container">
        <div class="flex justify-between no-wrap">
          <h2><span class="font-bold">Ответы</span><br>
            на вопросы:</h2>
          <div class="flex flex-col max-w-[600px] w-full">
            <div class="">
              <div  v-for="(item, index) in items" :key="index"  @click="item.showAnswer = !item.showAnswer" class="cursor-pointer relative mb-4 bg-c-gray-2 px-8 py-4 rounded-xl">
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
                  <q-icon class="absolute right-4 top-3" color="c-blue-1" size="32px" name="keyboard_arrow_down"></q-icon>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

<app-footer/>
</template>

<style scoped>
.bg-image {
  background-image: url('assets/images/bg-main.jpg');
  background-size: cover;
  background-position: center;
}

.background-with-text {
  background-image: url('assets/images/background-with-text.png');
  background-size: cover;
  background-position: center;
}

.background-with-text-large {
  background-image: url('assets/images/background-with-text-large.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}
.service-background-1 {
  background-image: url('assets/images/services/1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* Добавлено */
  object-fit: cover;
}
.service-background-2 {
  background-image: url('assets/images/services/2.png');
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
</style>
