import firebaseConfig from "./config/firebaseConfig";
import type { ModuleOptions as VueFireNuxtModuleOptions } from "nuxt-vuefire";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    vuefire?: VueFireNuxtModuleOptions;
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@vue-macros/nuxt",
    "nuxt-vuefire",
  ],
  vuefire: {
    auth: {
      enabled: true,
    },
    config: firebaseConfig,
  },
});