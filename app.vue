<template>
  <div class="min-h-screen flex justify-center bg-gray-200 py-10">
    <div class="max-w-3xl mt-5 w-full">

      <div class="p-5 bg-white shadow-sm rounded-sm">
        <img class="aspect-video object-cover object-bottom w-full" src="/background.jpg" alt="" >

        <div class="w-full">
          <audio ref="control" class="w-full" :src="`/audio/${current}.mp3`" controls autoplay></audio>
        </div>

        <div class="flex justify-between mt-5">
          <h1 class="text-xl">Đường Xưa Mây Trắng Phần {{current}}</h1>
          <label class="label cursor-pointer">
            <span class="label-text mr-2 italic">Autoplay </span> 
            <input type="checkbox" v-model="autoplay" class="toggle toggle-info" />
          </label>
        </div>
      </div>

      <div class="p-5 bg-white mt-3 rounded-sm">
        <div class="flex flex-col">
          <a :href="part + ''" class="audio-select first:border-t hover:bg-slate-200" :class="{active: current == part}" v-for="part, i in parts" :key="i" @click="() => change(part)">
            Đường Xưa Mây Trắng Phần {{part}}
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const part = useRoute().path.split('/')[1]
const parts = new Array(21).fill(0).map((_, i) => i + 1)

const current = ref(part ? +part : 1)
const autoplay = ref(true)
const control = ref<HTMLAudioElement>()

const change = (part: number) => {
  current.value = part
}

const next = () => {
  autoplay.value && change(current.value + 1)
}

onMounted(() => {
  control.value.addEventListener('ended', next)

  window.document.addEventListener('keydown', e => {
    if (e.key === ' ') {
      e.preventDefault()
      control.value.paused ? control.value.play() : control.value.pause()
    }
  })
})
</script>

<style scoped>
.audio-select {
  @apply py-2 border-b px-3 cursor-pointer transition-all duration-75
}

.audio-select:active {
  @apply bg-slate-300
}

.audio-select:first {
  @apply bg-black
}

.active {
  @apply bg-slate-200 cursor-default
}
</style>
