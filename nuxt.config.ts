// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss", "@formkit/nuxt"],

  devtools: { enabled: true },

  typescript: { shim: false },

  pwa: {},

  formkit: { autoImport: true },
});
