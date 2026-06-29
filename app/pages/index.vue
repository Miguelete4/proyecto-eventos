<script setup lang="ts">

import BaseModal from '~/components/BaseModal.vue';
import type { Usuario } from '~/types/usuario';

const { data: usuario, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuarios')

const errorForm = ref('')
const mostrarFormulario = ref(false)

const mostrarLogin = ref(false)

function abrirFormulario(usuario?: Usuario) {
    mostrarLogin.value = true
    errorForm.value = '' // Limpia errores previos al abrir
}


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
                        @click="abrirFormulario()">

                        Iniciar sesión

                    </UButton>

                </div>

            </nav>
        </header>

        <!-- Inicio de sesion -->

        <BaseModal v-model:open="mostrarFormulario" title="Inicio de Sesion"
            description="Ingrese sus datos para inicar ">
            <UForm>
                <UFormField name="email" label="Email">
                    <UInput placeholder="example@gmail.com">

                    </UInput>
                </UFormField>

                <UFormField name="contraseña" label="Contraseña">
                    <UInput placeholder="Contraseña">

                    </UInput>
                </UFormField>

            </UForm>
        </BaseModal>




        <!-- Parte de la informacion de la pagina -->
        <!-- Ayuda de la ia, luego cambiamos cosas xd -->
        <div
            class="flex flex-col items-center justify-center min-h-100 p-8 text-center bg-linear-to-br from-purple-600 to-gray-500">

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
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
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

                            <div class="flex justify-center mt-4">
                                <UButton @click=""
                                    class="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors text-sm justify-center">
                                    Inscribirse
                                </UButton>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>



    </div>
</template>