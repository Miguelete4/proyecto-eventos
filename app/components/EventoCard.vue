<script setup lang="ts">
import type { Evento } from '~/types/evento';

const props = defineProps<{
    evento: Evento
}>()

const fechaFormateada = computed(() => formatFecha(props.evento.fecha))
const horaFormateada = computed(() => formatHora(props.evento.fecha))
</script>

<template>

    <UCard class="bg-gray-900 border border-gray-800">

        <!-- La imagen nose bien como ponerla, pero veamoslo despues xd -->
        <img src="https://picsum.photos/600/250" class="rounded-lg h-44 w-full object-cover mb-4">

        <h3 class="text-xl font-bold mb-3">
            {{ evento.titulo }}
        </h3>

        <div>
            <span>
                {{ fechaFormateada }}
            </span>
        </div>
        <div>
            <span>
                {{ horaFormateada }}
            </span>
        </div>

        <div class="space-y-2 text-gray-300">
            <p>{{ evento.fecha }}</p>
            <p>{{ evento.lugar }}</p>
            <p>{{ evento.valor }}</p>
        </div>

    </UCard>

</template>