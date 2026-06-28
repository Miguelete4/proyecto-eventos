<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '~/components/BaseModal.vue'

// MODAL DE INICIO DE SESION
const mostrarLogin = ref(false)

const email = ref("")
const password = ref("")

// PARTE DE MODAL CONSULTAR INSCRIPCIONES
const mostrarInscripciones = ref(false) // Controla el primer modal (Email)
const mostrarMisEventos = ref(false)    // Controla el segundo modal (Eventos)
const emailConsulta = ref('')          // Guarda el correo


</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white">

        <!-- navbar -->
        <header class="bg-gray-950">
            <nav class="sticky top-0 bg-gray-900 mx-auto grid md:grid-cols-3 items-center justify-center">

                <!-- Logo de la pagina -->
                <div class="text-4xl font-extrabold text-purple-600 p-4 mx-4">
                    Smart Events
                </div>

                <!-- Links de las paaginas, cuando terminemos el diseño de todo vemos como hacer el
                 pasar las paginas que usabamos en clase, el NavegationLink:[]... -->
                <div class="flex items-center justify-center text-center gap-5 mx-4">

                </div>

                <div class="flex justify-center md:justify-end p-4">

                    <UButton
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none"
                        @click="mostrarLogin = true">
                        Iniciar sesión
                    </UButton>

                </div>

            </nav>
        </header>

        <!-- Parte de la informacion de la pagina -->
        <!-- Ayuda de la ia, luego cambiamos cosas xd -->
        <div
            class="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-linear-to-br from-purple-600 to-gray-500">

            <div class="flex flex-col max-w-2xl gap-8">

                <h2 class="text-5xl font-extrabold text-black">
                    El lugar donde están los mejores eventos
                </h2>

                <p class="text-black text-lg">
                    Así de simple: elige lo que quieres hacer hoy, inscríbete con un par de clics y vive la experiencia.
                </p>

            </div>

        </div>

        <section class="py-12 bg-gray-900">
            <div class="max-w-6xl mx-auto px-4">

                <div class="flex justify-between items-center mb-12">
                    <h3 class="text-2xl font-bold text-purple-600">
                        Eventos disponibles
                    </h3>

                    <!-- Tu botón modificado para abrir el modal (cambiamos el onclick por la variable de Vue) -->
                    <button type="button"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none"
                        @click="mostrarInscripciones = true">
                        Ver mis Inscripciones
                    </button>
                </div>

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

                                <p class="flex items-center gap-1">15 Oct 2026</p>
                                <p class="flex items-center gap-1">10:00</p>
                                <p class="flex items-center gap-1">Valparaíso</p>
                                <p class="flex items-center gap-1">Gratis</p>

                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors py-2 text-sm justify-center">
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

                                <p class="flex items-center gap-1">28 Octubre 2026</p>
                                <p class="flex items-center gap-1">10:00</p>
                                <p class="flex items-center gap-1">Santiago</p>
                                <p class="flex items-center gap-1">Gratis</p>

                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>

                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">👥 120
                                    inscritos
                                </span>

                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors py-2 text-sm justify-center">
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
                                    <span></span> 15 Oct 2026
                                </p>
                                <p class="flex items-center gap-1">
                                    <span></span> 18:00 hrs
                                </p>
                                <p class="flex items-center gap-1 col-span-2 truncate">
                                    <span></span> Valparaíso
                                </p>
                            </div>

                            <div class="flex justify-between items-center mt-3 text-sm font-medium">
                                <span class="text-emerald-600 text-base font-bold">
                                    $15.000
                                </span>
                                <span class="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                    32 inscritos
                                </span>
                            </div>

                            <UButton block
                                class="mt-4 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors py-2 text-sm justify-center">
                                Inscribirse
                            </UButton>
                        </div>

                    </div>

                </div>
            </div>
        </section>


        <!-- MODAL INICIO DE SESION -->
        <UModal v-model:open="mostrarLogin">
            <template #content>
                <!-- px-12 hace que el contenido empuje el modal hacia los lados, haciéndolo un poco más ancho -->
                <div class="py-16 px-12">

                    <h2 class="text-xl font-bold text-center mb-10">
                        Iniciar sesión
                    </h2>

                    <div class="space-y-8">

                        <!-- Fila Email -->
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium min-w-20">
                                email:
                            </label>
                            <UInput v-model="email" placeholder="Ingrese su correo" class="flex-1" />
                        </div>

                        <!-- Fila Contraseña -->
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium min-w-20">
                                contraseña:
                            </label>
                            <UInput v-model="password" type="password" placeholder="Ingrese su contraseña"
                                class="flex-1" />
                        </div>

                        <!-- Botón centrado de forma simple -->
                        <div class="pt-6 flex justify-center">

                            <UButton class="bg-purple-600 hover:bg-purple-700 py-3 px-8"
                                @click="navigateTo('/administracion')">
                                Ingresar
                            </UButton>

                        </div>

                    </div>

                </div>
            </template>
        </UModal>


        <!-- MODAL CONSULTAR EVENTOS INSCRITOS -->
        <UModal v-model:open="mostrarInscripciones">
            <template #content>
                <div class="py-12 px-12">
                    <h2 class="text-xl font-bold text-center mb-10">
                        Ingrese su email
                    </h2>

                    <div class="space-y-8">
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium min-w-14">
                                gmail:
                            </label>
                            <UInput v-model="emailConsulta" placeholder="Ingrese su correo" class="flex-1" />
                        </div>

                        <!-- Al hacer clic, cierra este modal y abre el siguiente -->
                        <div class="pt-6 flex justify-center">
                            <UButton class="bg-purple-600 hover:bg-purple-700 py-3 px-8"
                                @click="mostrarInscripciones = false; mostrarMisEventos = true">
                                Consultar eventos
                            </UButton>
                        </div>
                    </div>
                </div>
            </template>
        </UModal>


        <!-- SEGUNDO MODAL: Lista de Eventos Registrados (despues de tocar el boton de consultar)-->
        <UModal v-model:open="mostrarMisEventos">
            <template #content>
                <div class="py-12 px-12">
                    <h2 class="text-xl font-bold text-purple-600 text-center mb-8">
                        Mis Eventos Inscritos
                    </h2>

                    <div class="space-y-4 text-sm">

                        <!-- EVENTOS DE EJEMPLO (para tener una idea de como quedaria) -->
                        <!-- Evento 1 -->
                        <div class="p-4 border rounded-xl bg-purple-50/50 flex justify-between items-center">
                            <div>
                                <h4 class="font-bold text-gray-900">Conferencia Tech 2026</h4>
                                <p class="text-xs text-gray-500 mt-0.5">📅 15 de Octubre • 10:00 AM</p>
                            </div>
                            <span class="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                Confirmado
                            </span>
                        </div>

                        <!-- Evento 2 -->
                        <div class="p-4 border rounded-xl bg-white flex justify-between items-center">
                            <div>
                                <h4 class="font-bold text-gray-900">Taller Práctico de Vue 3</h4>
                                <p class="text-xs text-gray-500 mt-0.5">📅 22 de Noviembre • 3:00 PM</p>
                            </div>
                            <span class="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                Confirmado
                            </span>
                        </div>

                    </div>

                    <!-- Botón opcional para cerrar todo -->
                    <div class="pt-8 flex justify-center">
                        <UButton class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6"
                            @click="mostrarMisEventos = false">
                            Cerrar
                        </UButton>
                    </div>
                </div>
            </template>
        </UModal>


    </div>
</template>