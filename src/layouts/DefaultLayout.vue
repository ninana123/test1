<script setup>

import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <AppHeader />
    <main>
      <slot />
    </main>
  <AppFooter/>
</template>

<style scoped>

</style>