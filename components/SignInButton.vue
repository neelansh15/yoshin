<script setup lang="ts">
const { signIn } = useSignIn();
</script>

<template>
  <UButton @click="signIn">Sign In</UButton>
</template>
