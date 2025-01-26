<template>
    <div v-if="launch" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-900">{{ launch.name }}</h2>
                <button @click="$emit('close')"
                    class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="space-y-6">
                <div>
                    <p class="text-sm font-semibold text-gray-600">Date:</p>
                    <p class="text-lg text-gray-800">{{ formatDate(launch.date_utc) }}</p>
                </div>


                <p class="text-sm font-semibold text-gray-600">Mission Details:</p>
                <p v-if="launch.details === null" class="text-md text-gray-800">
                    Pas de détails pour le moment
                </p>
                <p v-else class="text-lg text-gray-800">
                    {{ launch.details }}
                </p>


                <div v-if="launch.links.patch.large.length">
                    <p class="text-sm font-semibold text-gray-600">Mission Image:</p>
                    <img :src="launch.links.patch.large" alt="Mission Image" class="w-full rounded-lg shadow-md" />
                </div>

                <div>
                    <p class="text-sm font-semibold text-gray-600">Launch Site:</p>
                    <p class="text-lg text-gray-800">{{ launch.launchpad }}</p>
                </div>

                <div v-if="launch.payloads.length">
                    <p class="text-sm font-semibold text-gray-600">Payloads:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li v-for="(payload, index) in launch.payloads" :key="index" class="text-lg text-gray-800">
                            <strong>Type:</strong> {{ payload[0] }}<br />
                            <strong>Clients:</strong> {{ payload || 'N/A' }}
                        </li>
                    </ul>
                </div>

                <div class="mt-4">
                    <p class="text-sm font-semibold text-gray-600">Article:</p>
                    <a v-if="launch.links.article" :href="launch.links.article" target="_blank"
                        class="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200">
                        Read the article
                    </a>
                    <p v-if="!launch.links.article" class="text-md text-gray-800">No article available</p>
                </div>

                <div class="mt-6">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" v-model="showVideo"
                            class="w-5 h-5 text-blue-500 rounded focus:ring-blue-400" />
                        <span class="text-lg text-gray-800">Show YouTube Video</span>
                    </label>

                    <div v-if="showVideo && launch.links.webcast" class="mt-4">
                        <iframe width="640" height="390" :src="getYouTubeEmbedUrl(launch.links.webcast)" frameborder="0"
                            allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Launch } from '../types/Launch';

const props = defineProps<{
    launch: Launch;
}>();

const emit = defineEmits(['close']);
const showVideo = ref(false);

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

    if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }

    return url;
};


console.log(props.launch)
</script>

<style scoped>
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.launch-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>