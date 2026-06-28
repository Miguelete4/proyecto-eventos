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

const staff = async () => {
    await navigateTo('/gestionStaff')
}

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
                            {{ adminNombre }} {{ adminApellido }}
                        </span>

                        <UButton color="error" variant="soft" @click="cerrarSesion">
                            Cerrar sesión
                        </UButton>

                    </div>

                </div>

            </div>
        </header>

        <main class="flex-1 container mx-auto px-6 py-10">

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <!-- LISTA DE EVENTOS -->
                <div class="lg:col-span-2">

                    <h2 class="text-3xl font-bold mb-2 text-purple-600 ">
                        Eventos disponibles
                    </h2>

                    <div class="grid md:grid-cols-2 gap-6">

                        <!-- Card -->

                        <UCard class="bg-gray-900 border border-gray-800">

                            <img src="https://picsum.photos/600/250" class="rounded-lg h-44 w-full object-cover mb-4">

                            <h3 class="text-xl font-bold mb-3">
                                Festival de Música
                            </h3>

                            <div class="space-y-2 text-gray-300">

                                <p>15/10/2026</p>

                                <p>Valparaíso</p>

                                <p>$15.000</p>

                                <p>40 inscritos</p>

                            </div>

                        </UCard>

                        <!-- Duplicar cuando existan más eventos -->

                        <UCard class="bg-gray-900 border border-gray-800">

                            <img src="https://picsum.photos/601/250" class="rounded-lg h-44 w-full object-cover mb-4">

                            <h3 class="text-xl font-bold mb-3">
                                Feria Tecnológica
                            </h3>

                            <div class="space-y-2 text-gray-300">

                                <p>22/11/2026</p>

                                <p>Santiago</p>

                                <p>Gratis</p>

                                <p>120 inscritos</p>

                            </div>

                        </UCard>

                    </div>

                </div>

                <!-- ========================= -->
                <!-- PANEL DERECHO -->
                <!-- ========================= -->

                <UCard class="bg-gray-900 border border-gray-800 h-fit">

                    <h2 class="text-2xl font-bold mb-6 text-purple-600 ">
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

        <footer
            class="bg-gray-900 border-t border-gray-800 text-center py-4 text-xs tracking-wider text-gray-500 uppercase">
            © 2026 Smart Events - Panel Administrativo
        </footer>

    </div>
</template>