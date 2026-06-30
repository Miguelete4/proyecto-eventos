<script setup lang="ts">
import type { Usuario } from '~/types/usuario';

const props = defineProps<{
    usuario: Usuario
}>()

</script>

<template>
    <UCard class="bg-gray-900 border border-gray-800 ">

        <h3 class="text-xl font-bold mb-4 text-purple-600 ">
            {{ usuario.nombre }}
        </h3>

        <div class="space-y-2 text-gray-300 mb-5">

            <p>Correo: {{ usuario.email }}</p>

            <p>Rol: {{ usuario.rol }}</p>

        </div>

        <div class="flex gap-3">

        </div>

    </UCard>
</template>