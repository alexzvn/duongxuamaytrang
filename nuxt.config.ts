// https://v3.nuxtjs.org/api/configuration/nuxt.config
import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  css: ['~/assets/tailwind.css'],

  build: {
    postcss: {
      postcssOptions: {
        plugins: { tailwindcss: tailwindConfig }
      }
    }
  }
})
