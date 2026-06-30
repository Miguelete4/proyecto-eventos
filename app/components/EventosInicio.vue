<script setup lang="ts">
import type { Evento } from '~/types/evento'

defineProps<{
    evento: Evento
}>()

const emit = defineEmits<{
    (e: 'inscribirse', evento: Evento): void
}>()
</script>

<template>
    <UCard class="flex flex-col h-full">

        <!-- despues modificamos la imagen para que se pueda ver una personalizada xd -->
        <img src="https://picsum.photos/600/250" class="rounded-lg h-44 w-full object-cover mb-4">

        <h3 class="text-xl font-bold mb-3">
            {{ evento.titulo }}
        </h3>

        <div class="space-y-2 text-gray-300">
            <p>{{ evento.fecha }}</p>
            <p>{{ evento.lugar }}</p>
            <p>${{ evento.valor }}</p>
            <p>{{ evento.inscritos?.length ?? 0 }} inscritos</p>
        </div>

        <!-- Empuja el botón hacia abajo -->
        <div class="mt-auto flex justify-center pt-6">

            <UButton @click="emit('inscribirse', evento)" class="px-6">
                Inscribirse
            </UButton>

        </div>

    </UCard>
</template>