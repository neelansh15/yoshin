<script setup lang="ts">
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types";

const currentUser = useCurrentUser();
const auth = useFirebaseAuth();
const router = useRouter();

const dropdownItems: DropdownItem[][] = [
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-right-on-rectangle-solid",
      click: () => {
        auth?.signOut();
      },
    },
  ],
];
</script>

<template>
  <UDropdown :items="dropdownItems" class="border-none">
    <div class="flex items-center gap-3 select-none">
      <UAvatar
        :src="
          currentUser?.photoURL ||
          'https://i.pinimg.com/originals/bc/75/88/bc75882d906b263fbe0550fe59dc7b21.jpg'
        "
      ></UAvatar>
      <div class="dark:text-white text-sm">
        <h3>{{ currentUser?.displayName }}</h3>
        <p
          class="-mt-0.5 text-xs text-primary-600 dark:text-envy-400 font-semibold"
        >
          Yoshin User
        </p>
      </div>
      <UIcon name="i-heroicons-chevron-down" class="dark:text-white" />
    </div>
  </UDropdown>
</template>
