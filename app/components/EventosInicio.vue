<script setup lang="ts">
import type { Evento } from '~/types/evento';

const props = defineProps<{
    evento: Evento
}>()

const emit = defineEmits<{
    (e: 'inscribirse', evento: Evento): void
}>()

const fechaFormateada = computed(() => formatFecha(props.evento.fecha))
const horaFormateada = computed(() => formatHora(props.evento.fecha))
</script>

<template>

    <UCard class="bg-gray-900 border border-gray-800">

        <img :src="evento.imagen || '/imagenes/default.jpg'" class="rounded-lg h-44 w-full object-cover mb-4">

        <h3 class="text-xl font-bold mb-3">
            {{ evento.titulo }}
        </h3>

        <div class="space-y-2 text-gray-300">
            <p>Fecha: {{ fechaFormateada }}</p>
            <p>Hora: {{ horaFormateada }}</p>
            <p>Lugar: {{ evento.lugar }}</p>
            <p>Valor: {{ evento.valor }}</p>
            <p>{{ evento.inscrito?.length ?? 0 }} inscripciones realizadas</p>
        </div>

        <div class="mt-auto flex justify-center pt-6">

            <UButton
                class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors w-full justify-center text-xl"
                @click="emit('inscribirse', evento)">
                Inscribirse
            </UButton>

        </div>
    </UCard>

</template>
