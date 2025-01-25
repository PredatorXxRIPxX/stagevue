<template>
    <div
      class="next-launch bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105"
    >
      <h2 class="text-3xl font-bold text-white mb-6 text-center">Prochain Lancement</h2>
  
      
      <div v-if="nextLaunch" class="space-y-4 animate-fade-in">
        <p class="text-2xl font-semibold text-white text-center">{{ nextLaunch.name }}</p>
  
        <p class="text-lg text-blue-100 text-center">
          Date: {{ formatDate(nextLaunch.date_utc) }}
        </p>
  
        <div class="countdown text-4xl font-bold text-white text-center">
          {{ countdown }}
        </div>
      </div>
  
      <div v-else class="text-center">
        <div class="loading-spinner flex justify-center items-center space-x-2">
          <div class="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div class="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
          <div class="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
        <p class="text-lg text-blue-100 mt-4">Chargement...</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { spaceXService } from '../services/spaceXApi';
  import type { Launch } from '../types/Launch';
  
  const nextLaunch = ref<Launch | null>(null);
  const countdown = ref('');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  const updateCountdown = () => {
    if (nextLaunch.value) {
      const launchTime = new Date(nextLaunch.value.date_utc).getTime();
      const now = new Date().getTime();
      const distance = launchTime - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      countdown.value = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }
  };
  
  onMounted(async () => {
    try {
      nextLaunch.value = await spaceXService.getNextLaunch();
      const countdownInterval = setInterval(updateCountdown, 1000);
      onUnmounted(() => clearInterval(countdownInterval));
    } catch (error) {
      console.error('Erreur de chargement du prochain lancement', error);
    }
  });
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .loading-spinner div {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  </style>