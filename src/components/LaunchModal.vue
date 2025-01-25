<template>
    <div v-if="launch" class="fixed inset-0 bg-black bg-opacity-50 grid grid-cols-3 z-50 p-4">
        <div class="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">{{ launch.name }}</h2>
                <button @click="$emit('close')" class="text-red-500 hover:text-red-700">
                    Fermer
                </button>
            </div>

            <div class="space-y-4 ">
                <div>
                    <p class="font-bold">Date:</p>
                    <p>{{ formatDate(launch.date_utc) }}</p>
                </div>

                <div v-if="launch.details">
                    <p class="font-bold">Détails de la mission:</p>
                    <p>{{ launch.details }}</p>
                </div>

                <div v-if="launch.links.flickr.original.length">
                    <p class="font-bold">Image de la mission:</p>
                    <img :src="launch.links.flickr.original[0]" alt="Mission Image" class="w-full rounded" />
                </div>

                <div>
                    <p class="font-bold">Lieu de lancement:</p>
                    <p>{{ launch.launchpad }}</p>
                </div>

                <div>
                    <p class="font-bold">Chargements:</p>
                    <ul class="list-disc pl-5">
                        <li v-for="(payload, index) in launch.payloads" :key="index">
                            Type: {{ payload.type }}
                            (Clients: {{ payload.customers.join(', ') }})
                        </li>
                    </ul>
                </div>

                <div v-if="launch.links.article" class="mt-4">
                    <a :href="launch.links.article" target="_blank" class="text-blue-500 hover:underline">
                        Article de présentation
                    </a>
                </div>

                <div class="mt-4">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="showVideo" class="mr-2" />
                        Afficher la vidéo YouTube
                    </label>

                    <div v-if="showVideo && launch.links.webcast" class="mt-2">
                        <iframe :src="launch.links.webcast" class="w-full h-64" allowfullscreen></iframe>
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
        year: 'numeric'
    });
};
</script>