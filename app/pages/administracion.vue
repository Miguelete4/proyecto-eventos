<script setup lang="ts">
import { ref } from 'vue'

// Forzamos un layout vacío para manejar todo el diseño directamente aquí
definePageMeta({
    layout: false
})

// Datos del administrador (basado en tu modelo Prisma)
const adminNombre = ref("Juan")
const adminApellido = ref("Pérez")

const cerrarSesion = async () => {
    await navigateTo('/')
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">

        <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-xl">
            <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

                <h1 class="text-2xl font-black tracking-wider text-primary-500 uppercase">
                    SMARTS EVENTS
                </h1>

                <div class="flex flex-wrap items-center gap-4">
                    <UButton gray variant="ghost" class="hover:bg-gray-800">
                        Administrar staff
                    </UButton>

                    <UButton gray variant="ghost" class="hover:bg-gray-800">
                        Administrar eventos
                    </UButton>

                    <span class="hidden sm:inline text-gray-700">|</span>

                    <div class="flex items-center gap-3">
                        <span
                            class="text-sm font-medium text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-800">
                            👤 {{ adminNombre }} {{ adminApellido }}
                        </span>
                        <UButton red variant="soft" size="sm" @click="cerrarSesion">
                            Cerrar sesión
                        </UButton>
                    </div>
                </div>

            </div>
        </header>

        <main class="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">

            <h2 class="text-3xl font-bold tracking-tight text-center text-white mb-12">
                Bienvenido <span class="text-primary-400">"{{ adminNombre }} {{ adminApellido }}"</span>
            </h2>

            <div
                class="w-full max-w-5xl text-center text-gray-500 py-20 border-2 border-dashed border-gray-800 rounded-2xl">
                Espacio disponible para la gestión independiente de Staff o Eventos.
            </div>

        </main>

        <footer
            class="bg-gray-900 border-t border-gray-800 text-center py-4 text-xs tracking-wider text-gray-500 uppercase">
            © 2026 Smart Events - Panel Administrativo
        </footer>

    </div>
</template>