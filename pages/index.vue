<script setup lang="ts">
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <div class="pt-36 pb-44 bg-primary-50 dark:bg-envy-900 text-center">
    <h1 class="font-onest font-extrabold text-5xl text-primary-700 dark:text-white">
      Yoshin
    </h1>
    <h2 class="mt-3 text-2xl italic text-primary-800 dark:text-envy-300">
      Fastest way to launch your NFT's metadata
    </h2>
    <pre>{{ user || "No user yet" }}</pre>
  </div>
</template>
