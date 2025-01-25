<template>
  <div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-6xl font-bold mb-6 text-center p-10">Lancements SpaceX</h1>

    <NextLaunch class="mb-6" />
    <LaunchList @select-launch="openLaunchModal" />

    <LaunchModal v-if="selectedLaunch" :launch="selectedLaunch" @close="selectedLaunch = null" />
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
</script>