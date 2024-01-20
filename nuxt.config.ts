// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss"],

  devtools: { enabled: true },

  typescript: { shim: false },

  pwa: {},
});
