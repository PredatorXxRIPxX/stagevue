<template>
    <div class="launch-list mt-6">
        <select v-model="launchFilter" class="w-full p-2 border rounded mb-4 shadow-sm" @change="fetchLaunches">
            <option value="all">Tous les lancements</option>
            <option value="success">Lancements réussis</option>
            <option value="failed">Lancements échoués</option>
        </select>

        <div v-for="launch in launches" :key="launch.id"
            class="launch-item mb-2 p-3 border rounded cursor-pointer hover:bg-gray-100 transition-colors"
            @click="$emit('select-launch', launch)">
            <p class="font-bold">{{ launch.name }}</p>
            <p>{{ formatDate(launch.date_utc) }}</p>
            <p>{{ launch.success ? 'Succès' : 'Échec' }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { spaceXService } from '../services/spaceXApi';
import type { Launch } from '../types/Launch';

const launches = ref<Launch[]>([]);
const launchFilter = ref<'all' | 'success' | 'failed'>('all');

const emit = defineEmits(['select-launch']);

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const fetchLaunches = async () => {
    try {
        launches.value = await spaceXService.getLaunches(launchFilter.value);
    } catch (error) {
        console.error('Erreur de chargement des lancements', error);
    }
};

onMounted(fetchLaunches);
</script>