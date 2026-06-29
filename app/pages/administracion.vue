<script setup lang="ts">

import { ref } from 'vue'

const cerrarSesion = async () => {
    await navigateTo('/')
}

const staff = async () => {
    await navigateTo('/gestionStaff')
} 

import type { Evento } from '~/types/evento'

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')
console.log(eventos.value)

</script>

<template>


    <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">

        <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-xl">
            <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

                <h1 class="text-2xl font-black tracking-wider text-purple-600 uppercase">
                    SMARTS EVENTS
                </h1>

                <div class="flex items-center gap-8">

                    <UButton color="primary" variant="soft" @click="staff">
                        Administrar Staff
                    </UButton>

                    <div class="flex items-center gap-3 ">

                        <span class="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-lg ">
                            <!-- {{ adminNombre }} {{ adminApellido }} -->
                        </span>

                        <UButton color="error" variant="soft" @click="cerrarSesion">
                            Cerrar sesión
                        </UButton>

                    </div>

                </div>

            </div>
        </header>

        <!-- PARTE IZQUIERDA (CARDS DE EVENTOS) -->
        <main class="flex-1 container mx-auto px-6 py-10">

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-2">

                    <div class="grid md:grid-cols-2 gap-6">

                        <EventoCard v-for="evento in eventos" :key="evento.id" :evento="evento" />

                    </div>
                </div>
 

                <!-- PARTE DERECHA (AGREGAR / ELIMINAR EVENTOS) -->
                <UCard class="bg-gray-900 border border-gray-800 h-fit">

                    <h2 class="text-2xl font-bold mb-6 text-purple-600">
                        Agregar evento
                    </h2>

                    <div class="space-y-5">
                        <UInput placeholder="Título" />
                        <UInput type="date" />
                        <UInput placeholder="Lugar" />
                        <UInput placeholder="Valor" />
                        <UInput type="file" />

                        <UButton color="primary" block>
                            Agregar evento
                        </UButton>

                        <UDivider class="my-3" />

                        <h3 class="text-xl font-semibold">
                            Eliminar evento
                        </h3>

                        <UInput placeholder="ID del evento" />

                        <UButton color="error" block>
                            Eliminar
                        </UButton>
                    </div>

                </UCard>

            </div>
        </main>

    </div>
</template>