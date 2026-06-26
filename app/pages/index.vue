<script setup lang="ts">
import { ref } from 'vue'

const mostrarModal = ref(false)
const correo = ref("")
const consultado = ref(false)

const consultarEventos = () => {
    // Después aquí consultarás la BD
    consultado.value = true
}
</script>

<template>
    <div class="min-h-screen bg-gray-100">

        <!-- navbar -->
        <header class="bg-white shadow">
            <div class="container mx-auto flex items-center justify-between px-6 py-4">

                <h1 class="text-2xl font-bold text-blue-600">
                    Smart Events
                </h1>

                <div class="flex items-center gap-6">

                    <UButton variant="ghost" @click="mostrarModal = true">
                        Mis eventos
                    </UButton>

                    <UButton color="primary">
                        Iniciar sesión
                    </UButton>

                </div>

            </div>
        </header>

        <!-- Hero -->
        <section class=" container mx-auto py-12 text-center">

            <h2 class="text-4xl font-bold text-black mb-4">
                Descubre nuestros eventos
            </h2>

            <p class="text-gray-600 max-w-2xl mx-auto">
                Encuentra eventos disponibles e inscríbete fácilmente.
            </p>

        </section>

        <!-- Eventos -->
        <section class="container mx-auto pb-12">

            <h3 class="text-2xl font-semibold text-black mb-6">
                Eventos disponibles
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <!-- Card -->
                <UCard class="bg-gray-800 text-white">

                    <img src="https://picsum.photos/500/250" class="rounded-lg mb-4 w-full h-48 object-cover" />

                    <h4 class="text-xl font-bold">
                        Festival de Música
                    </h4>

                    <div class="mt-3 space-y-1 text-white">

                        <p>📅 15 Octubre 2026</p>
                        <p>🕒 18:00</p>
                        <p>📍 Valparaíso</p>
                        <p>💲 $15.000</p>
                        <p>👥 32 inscritos</p>

                    </div>

                    <UButton block class="mt-5">
                        Inscribirse
                    </UButton>

                </UCard>

                <!-- Duplica esta card cuando tengas datos -->

                <UCard class="bg-gray-800 text-white">

                    <img src="https://picsum.photos/501/250" class="rounded-lg mb-4 w-full h-48 object-cover" />

                    <h4 class="text-xl font-bold">
                        Feria Tecnológica
                    </h4>

                    <div class="mt-3 space-y-1 text-white">

                        <p>📅 28 Octubre 2026</p>
                        <p>🕒 10:00</p>
                        <p>📍 Santiago</p>
                        <p>💲 Gratis</p>
                        <p>👥 120 inscritos</p>

                    </div>

                    <UButton block class="mt-5">
                        Inscribirse
                    </UButton>

                </UCard>

                <UCard class="bg-gray-800 text-white">

                    <img src="https://picsum.photos/502/250" class="rounded-lg mb-4 w-full h-48 object-cover" />

                    <h4 class="text-xl font-bold">
                        Torneo Gamer
                    </h4>

                    <div class="mt-3 space-y-1 text-white">

                        <p>5 Noviembre 2026</p>
                        <p>14:00</p>
                        <p>Viña del Mar</p>
                        <p>$8.000</p>
                        <p>57 inscritos</p>

                    </div>

                    <UButton block class="mt-5">
                        Inscribirse
                    </UButton>

                </UCard>

            </div>

        </section>

        <!-- Modal para mostrar eventos registrados -->
        <UModal v-model:open="mostrarModal">

            <template #content>

                <div class="p-6">

                    <h2 class="text-2xl font-bold mb-5">
                        Mis eventos
                    </h2>

                    <UInput v-model="correo" placeholder="Ingrese su correo electrónico" />

                    <UButton class="mt-4 w-full" @click="consultarEventos">
                        Consultar
                    </UButton>

                    <div v-if="consultado" class="mt-6 border-t pt-4">

                        <h3 class="font-bold mb-3">
                            Eventos encontrados
                        </h3>

                        <ul class="space-y-2">

                            <li>🎵 Festival de Música</li>

                            <li>💻 Feria Tecnológica</li>

                            <li>🎮 Torneo Gamer</li>

                        </ul>

                    </div>

                </div>

            </template>

        </UModal>
    </div>
</template>