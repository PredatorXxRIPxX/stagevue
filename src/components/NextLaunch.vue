<template>
    <div class="next-launch bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Prochain Lancement</h2>
        <div v-if="nextLaunch" class="space-y-2 animate-fade-in">
            <p class="text-xl font-semibold">{{ nextLaunch.name }}</p>
            <p>Date: {{ formatDate(nextLaunch.date_utc) }}</p>
            <div class="countdown text-3xl font-bold text-blue-600">
                {{ countdown }}
            </div>
        </div>
        <div v-else class="text-center">
            <span class="loading-spinner">Chargement...</span>
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
        year: 'numeric'
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