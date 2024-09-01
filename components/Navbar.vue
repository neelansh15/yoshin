<script setup lang="ts">
import type { Link } from "@nuxt/ui-pro/types";

const props = defineProps<{
  mobileLinks?: any[];
}>();

const currentUser = useCurrentUser();
const { width } = useWindowSize();

const defaultLinks: Link[] = [
  {
    label: "Pricing",
    to: "/pricing",
  },
];

const links: Link[] = $computed(() =>
  (currentUser.value
    ? [
        {
          label: "Projects",
          to: "/projects",
        },
        ...defaultLinks,
      ]
    : defaultLinks
  ).concat(props.mobileLinks && width.value < 1024 ? props.mobileLinks : [])
);
</script>

<template>
  <UHeader
    :links="links"
    class="font-onest bg-primary-50 dark:bg-envy-900 dark:text-white border-none"
  >
    <template #logo>
      <span class="text-primary-700 dark:text-white">Yoshin</span>
    </template>
    <template #right>
      <!-- <span class="dark"> -->
      <UColorModeButton />
      <!-- </span> -->

      <ClientOnly>
        <User v-if="currentUser && currentUser.email" />
        <SignInButton v-else />
      </ClientOnly>
    </template>
  </UHeader>
</template>
