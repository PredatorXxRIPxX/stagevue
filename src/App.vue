<template>
  <div class="container mx-auto">
    <h1 class="text-6xl font-bold mb-6 text-center p-10">Lancements SpaceX</h1>

   
    <NextLaunch class="mb-6" />

    <LaunchList @select-launch="openLaunchModal" />

    <LaunchModal v-if="selectedLaunch" :launch="selectedLaunch" @close="closeLaunchModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NextLaunch from './components/NextLaunch.vue';
import LaunchList from './components/LaunchList.vue';
import LaunchModal from './components/LaunchModal.vue';
import type { Launch } from './types/Launch';


const selectedLaunch = ref<Launch | null>(null);

const openLaunchModal = (launch: Launch) => {
  selectedLaunch.value = launch;
};

const closeLaunchModal = () => {
  selectedLaunch.value = null;
};
</script>