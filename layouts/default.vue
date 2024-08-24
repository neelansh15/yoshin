<script setup lang="ts">
const colorMode = useColorMode();

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/tos",
  },
];
</script>
<template>
  <NuxtLoadingIndicator />

  <div :class="colorMode.value" id="defaultlayout">
    <Navbar />
    <div class="font-onest min-h-screen dark:bg-envy-900/95 dark:text-white">
      <NuxtPage />
    </div>
    <footer
      class="font-onest py-10 bg-primary-950 dark:bg-envy-900 dark:text-white"
    >
      <UContainer class="flex justify-between items-center">
        <NuxtLink to="/">
          <h1 class="text-xl text-primary-100 dark:text-white font-bold">
            Yoshin
          </h1>
        </NuxtLink>

        <div class="space-x-3 text-sm text-primary-100">
          <a
            v-for="link in footerLinks"
            :href="link.href"
            class="hover:underline"
            >{{ link.title }}</a
          >
        </div>
      </UContainer>
    </footer>
  </div>

  <UNotifications />
</template>
