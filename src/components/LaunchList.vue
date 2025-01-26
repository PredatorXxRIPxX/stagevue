<template>
    <div>
        <div class="launch-list mt-6 relative">
            <select v-model="launchFilter"
                class="w-full p-3 border border-gray-700 rounded-lg mb-4 shadow-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none pr-10"
                @change="fetchLaunches">
                <option value="all" class="bg-gray-800">Tous les lancements</option>
                <option value="success" class="bg-gray-800">Lancements réussis</option>
                <option value="failed" class="bg-gray-800">Lancements échoués</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center h-32">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <div v-else class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="launch in launches" :key="launch.id"
                class="launch-item bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
                :class="{ 'bg-green-50': launch.success, 'bg-red-50': !launch.success }"
                @click="emit('select-launch', launch)">
                <p class="text-xl font-semibold text-gray-800 mb-2">{{ launch.name }}</p>

                <p class="text-sm text-gray-600 mb-4">
                    {{ formatDate(launch.date_utc) }}
                </p>

                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
                    :class="{ 'bg-green-100 text-green-800': launch.success, 'bg-red-100 text-red-800': !launch.success }">
                    {{ launch.success ? 'Succès' : 'Échec' }}
                </div>

                <div class="flex items-center justify-between border-t border-gray-100 pt-4">
                    <p class="text-sm text-gray-600 font-medium">Clicker pour plus d'informations</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { spaceXService } from '../services/spaceXApi';
import type { Launch } from '../types/Launch';

const launches = ref<Launch[]>([]);
const launchFilter = ref<'all' | 'success' | 'failed'>('all');
const loading = ref(false);

const emit = defineEmits(['select-launch']);

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const fetchLaunches = async () => {
    loading.value = true;
    try {
        launches.value = await spaceXService.getLaunches(launchFilter.value);
    } catch (error) {
        console.error('Erreur de chargement des lancements', error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchLaunches);
</script>

<style scoped>
select::-webkit-scrollbar {
    width: 8px;
}

select::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Smooth transitions */
.launch-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>