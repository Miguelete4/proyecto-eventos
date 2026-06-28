<script setup lang="ts">

import BaseModal from '~/components/BaseModal.vue'


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
                        @click="">
                        Iniciar sesión
                    </UButton>

                </div>

            </nav>
        </header>



        <!-- MODAL INICIO DE SESION -->
        <BaseModal title="formulario" description="inicio">
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
                            <UInput placeholder="Ingrese su correo" class="flex-1" />
                        </div>

                        <!-- Fila Contraseña -->
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium min-w-20">
                                contraseña:
                            </label>
                            <UInput type="password" placeholder="Ingrese su contraseña" class="flex-1" />
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

                    <!-- modal para ver inscripciones -->
                    <<<<<<< HEAD <!-- Tu botón modificado para abrir el modal (cambiamos el onclick por la variable de
                        Vue) -->

                        =======
                        >>>>>>> cd14a35b7289107963096b84395b1019c7b6c1c0
                        <button type="button"
                            class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none"
                            @click="">
                            Ver mis Inscripciones
                        </button>
                </div>

                <!-- MODAL CONSULTAR EVENTOS INSCRITOS -->
                <BaseModal title="Consultar Eventos" description="Ingrese su email">
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
                                    <UInput placeholder="Ingrese su correo" class="flex-1" />
                                </div>

                                <!-- Al hacer clic, cierra este modal y abre el siguiente -->
                                <div class="pt-6 flex justify-center">
                                    <UButton class="bg-purple-600 hover:bg-purple-700 py-3 px-8" @click="">
                                        Consultar eventos
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseModal>


                <!-- SEGUNDO MODAL: Lista de Eventos Registrados (despues de tocar el boton de consultar)-->
                <BaseModal title="Eventos Inscritos" description="Lista de eventos">
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
                                    <span
                                        class="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                        Confirmado
                                    </span>
                                </div>

                                <!-- Evento 2 -->
                                <div class="p-4 border rounded-xl bg-white flex justify-between items-center">
                                    <div>
                                        <h4 class="font-bold text-gray-900">Taller Práctico de Vue 3</h4>
                                        <p class="text-xs text-gray-500 mt-0.5">📅 22 de Noviembre • 3:00 PM</p>
                                    </div>
                                    <span
                                        class="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                        Confirmado
                                    </span>
                                </div>

                            </div>

                            <!-- Botón opcional para cerrar todo -->
                            <div class="pt-8 flex justify-center">
                                <UButton class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6" @click="">
                                    Cerrar
                                </UButton>
                            </div>
                        </div>
                    </template>
                </BaseModal>


                <div>
                    <section class="p-6">
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
                    </section>

                    <div @click.self=""
                        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                        <div
                            class="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-sm w-full border border-gray-150 dark:border-gray-800">

                            <h3 class="text-lg font-bold text-gray-900 dark:text-white text-center mb-6">
                                Formulario de Inscripción
                            </h3>

                            <div class="space-y-4 flex flex-col items-center w-full">

                                <div class="w-full max-w-xs">
                                    <label
                                        class="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 text-center">Nombre</label>
                                    <input type="text" placeholder="Tu nombre"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-transparent text-sm text-center text-gray-800 dark:text-gray-200" />
                                </div>

                                <div class="w-full max-w-xs">
                                    <label
                                        class="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 text-center">Apellido</label>
                                    <input type="text" placeholder="Tu apellido"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-transparent text-sm text-center text-gray-800 dark:text-gray-200" />
                                </div>

                                <div class="w-full max-w-xs">
                                    <label
                                        class="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 text-center">Email</label>
                                    <input type="email" placeholder="correo@ejemplo.com"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none bg-transparent text-sm text-center text-gray-800 dark:text-gray-200" />
                                </div>

                                <button @click=""
                                    class="mt-4 px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors text-sm w-40 text-center">
                                    Inscribirse
                                </button>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>




    </div>
</template>