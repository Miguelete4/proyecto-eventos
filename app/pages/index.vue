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
            <nav class="sticky top-0 bg-white mx-auto grid md:grid-cols-3 items-center justify-center">

                <!-- Logo de la pagina -->
                <div class="text-4xl font-extrabold text-blue-600 p-4 mx-4">
                    Smart Events
                </div>

                <!-- Links de las paaginas, cuando terminemos el diseño de todo vemos como hacer el
                 pasar las paginas que usabamos en clase, el NavegationLink:[]... -->
                <div class="flex items-center justify-center text-center gap-5 mx-4">

                    <a class="text-gray-800 hover:text-blue-600 transition-colors text-xl" href="/">
                        Inscripciones
                    </a>

                </div>

                <div class="flex justify-center md:justify-end p-4">
                    <UButton
                        class="rounded-2xl bg-blue-600 text-white font-sans hover:bg-blue-700 shadow-md px-5 py-2.5 transition-colors border-none"
                        @click.prevent="">
                        Iniciar sesión
                    </UButton>
                </div>

            </nav>
        </header>

        <!-- Parte de la informacion de la pagina -->
        <div class="flex flex-col items-center w-full h-96 bg-linear-to-br from-blue-600 to-indigo-700 text-white">

            <div class="flex text-center flex-col py-20 px-4 gap-4">

                <h2 class="text-5xl font-bold text-black mb-4">
                    El lugar donde están los mejores eventos
                </h2>

                <div class="flex flex-col text-center ">
                    <p class="text-black-500 max-w-2xl mx-auto">
                        Así de simple: elige lo que quieres hacer hoy, inscríbete con un par de clics y vive la
                        experiencia.
                    </p>
                </div>
            </div>

        </div>

        <section class="py-12 bg-gray-400">
            <div class="max-w-6xl mx-auto px-4">

                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                    Eventos disponibles
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    <div
                        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden max-w-sm mx-auto w-full">

                        <img src="https://picsum.photos/500/250" class="w-full h-40 object-cover"
                            alt="Festival de Música" />

                        <div class="p-4 text-left">

                            <h4 class="text-lg font-bold text-gray-900 truncate">
                                Festival de Música
                            </h4>

                            <div
                                class="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 text-sm text-gray-600 border-b border-gray-100 pb-3">
                                <p class="flex items-center gap-1">
                                    <span>📅</span> 15 Oct 2026
                                </p>
                                <p class="flex items-center gap-1">
                                    <span>🕒</span> 18:00 hrs
                                </p>
                                <p class="flex items-center gap-1 col-span-2 truncate">
                                    <span>📍</span> Valparaíso
                                </p>
                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    👥 32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors py-2 text-sm justify-center">
                                Inscribirse
                            </UButton>
                        </div>

                    </div>

                    <div
                        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden max-w-sm mx-auto w-full">

                        <img src="https://picsum.photos/500/250" class="w-full h-40 object-cover"
                            alt="Festival de Música" />

                        <div class="p-4 text-left">

                            <h4 class="text-lg font-bold text-gray-900 truncate">
                                Festival de Música
                            </h4>

                            <div
                                class="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 text-sm text-gray-600 border-b border-gray-100 pb-3">
                                <p class="flex items-center gap-1">
                                    <span>📅</span> 15 Oct 2026
                                </p>
                                <p class="flex items-center gap-1">
                                    <span>🕒</span> 18:00 hrs
                                </p>
                                <p class="flex items-center gap-1 col-span-2 truncate">
                                    <span>📍</span> Valparaíso
                                </p>
                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    👥 32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors py-2 text-sm justify-center">
                                Inscribirse
                            </UButton>
                        </div>

                    </div>

                    <div
                        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden max-w-sm mx-auto w-full">

                        <img src="https://picsum.photos/500/250" class="w-full h-40 object-cover"
                            alt="Festival de Música" />

                        <div class="p-4 text-left">

                            <h4 class="text-lg font-bold text-gray-900 truncate">
                                Festival de Música
                            </h4>

                            <div
                                class="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 text-sm text-gray-600 border-b border-gray-100 pb-3">
                                <p class="flex items-center gap-1">
                                    <span>📅</span> 15 Oct 2026
                                </p>
                                <p class="flex items-center gap-1">
                                    <span>🕒</span> 18:00 hrs
                                </p>
                                <p class="flex items-center gap-1 col-span-2 truncate">
                                    <span>📍</span> Valparaíso
                                </p>
                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    👥 32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors py-2 text-sm justify-center">
                                Inscribirse
                            </UButton>
                        </div>

                    </div>

                    <div
                        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden max-w-sm mx-auto w-full">

                        <img src="https://picsum.photos/500/250" class="w-full h-40 object-cover"
                            alt="Festival de Música" />

                        <div class="p-4 text-left">

                            <h4 class="text-lg font-bold text-gray-900 truncate">
                                Festival de Música
                            </h4>

                            <div
                                class="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-3 text-sm text-gray-600 border-b border-gray-100 pb-3">
                                <p class="flex items-center gap-1">
                                    <span>📅</span> 15 Oct 2026
                                </p>
                                <p class="flex items-center gap-1">
                                    <span>🕒</span> 18:00 hrs
                                </p>
                                <p class="flex items-center gap-1 col-span-2 truncate">
                                    <span>📍</span> Valparaíso
                                </p>
                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    👥 32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition-colors py-2 text-sm justify-center">
                                Inscribirse
                            </UButton>
                        </div>

                    </div>

                </div>
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