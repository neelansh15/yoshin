<script setup lang="ts">
import type { VerticalNavigationLink } from "@nuxt/ui/dist/runtime/types";
import type { Link } from "@nuxt/ui-pro/types";

const props = defineProps<{
  mobileLinks?: any[];
}>();

const defaultLinks: Link[] = [];
</script>

<template>
  <UHeader
    :links="defaultLinks"
    class="font-onest bg-primary-50 dark:bg-envy-900 dark:text-white border-none"
  >
    <template #logo>
      <span class="text-primary-700 dark:text-white">Yoshin</span>
    </template>
    <template #right>
      <!-- <span class="dark"> -->
      <UColorModeButton />
      <!-- </span> -->
    </template>
  </UHeader>
</template>
