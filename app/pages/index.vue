<script setup lang="ts">

import BaseModal from '~/components/BaseModal.vue';
import type { Usuario } from '~/types/usuario';

const { data: usuario, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuarios')

// Formulario de iniciar sesion
const mostrarFormInicio = ref(false)
const errorFormInicio = ref()
const guardarFormInicio = ref(false)

const form = reactive({
    email: '',
    password: ''
})

function resetFormInicio() {
    form.email = ''
    form.password = ''
    errorFormInicio.value = ''
}

function abrirFormInicio() {
    resetFormInicio()
    mostrarFormInicio.value = true
}

function cerrarFormInicio() {
    mostrarFormInicio.value = false
    resetFormInicio()
}

// Funcion del login, verifica usuario en la BD
const { fetch: fetchSession } = useUserSession()

async function login() {
    guardarFormInicio.value = true
    errorFormInicio.value = ''

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: form.email,
                password: form.password
            }
        })

        await fetchSession()
        cerrarFormInicio() // <-- IMPORTANTE: Cerramos el modal antes de redirigir
        await navigateTo('/administracion')
    }
    catch (err: any) {
        // Opcional: capturar el mensaje real que viene del servidor backend
        errorFormInicio.value = ('No se pudo iniciar sesión. Verifique sus datos.')
    }
    finally {
        guardarFormInicio.value = false
    }
}

// Formluario de inscripciones
const guardarFormInscipciones = ref(false)
const errorFormInscripciones = ref()
const mostrarFormInscripciones = ref(false)

const formInscripciones = reactive({
    email: '',
    nombre: '',
    apellido: ''
})

function resetFormInscripciones() {
    formInscripciones.email = '',
        formInscripciones.nombre = '',
        formInscripciones.apellido = '',
        errorFormInscripciones.value = ''
}

function abrirFormInscripciones() {
    resetFormInscripciones()
    mostrarFormInscripciones.value = true
}

function cerrarFormInscripciones() {
    mostrarFormInscripciones.value = false
    resetFormInscripciones()
}

// Funcion para la inscripcion
async function guardarEvento() {
    guardarFormInscipciones.value = true
    errorFormInscripciones.value = ''

    try {
        await $fetch('/api/inscritos', {
            method: 'POST',
            body: {
                email: formInscripciones.email,
                nombre: formInscripciones.nombre,
                apellido: formInscripciones.apellido
            }
        })
        cerrarFormInscripciones()
        await refresh()
    }
    catch (error) {
        errorFormInscripciones.value = 'Error, no se logro inscripbir de manera correcta'
    }
    finally {
        guardarFormInscipciones.value = false
    }
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
                        @click="abrirFormInicio">
                        Iniciar sesión
                    </UButton>

                </div>

            </nav>
        </header>

        <!-- Inicio de sesion -->

        <BaseModal v-model:open="mostrarFormInicio" title="Inicio de Sesion" description="Ingrese sus datos para inicar"
            :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-purple-500' }">
            <UForm class="space-y-5" @submit.prevent="login" :state="form">
                <UFormField name="email" label="Email" type="email">
                    <UInput v-model="form.email" placeholder="example@gmail.com" color="neutral" variant="outline"
                        class="w-full">
                    </UInput>
                </UFormField>

                <UFormField name="contraseña" label="Contraseña" type="password">
                    <UInput v-model="form.password" placeholder="Contraseña" color="neutral" variant="outline"
                        class="w-full">
                    </UInput>
                </UFormField>

                <UButton type="submit" :loading="guardarFormInicio"
                    class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                    Ingresar
                </UButton>

                <UButton @click="cerrarFormInicio" type="button"
                    class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                    Cancelar
                </UButton>

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
                                <UButton @click="abrirFormInscripciones"
                                    class="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow-sm hover:bg-purple-700 transition-colors text-sm justify-center">
                                    Inscribirse
                                </UButton>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>

        <!-- Modal de inscripciones -->
        <BaseModal v-model:open="mostrarFormInscripciones" title="Inicio de Sesion"
            description="Ingrese sus datos para inicar"
            :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-purple-500' }">
            <UForm class="space-y-5" @submit="guardarEvento" :state="formInscripciones">

                <UFormField name="email" label="Email" type="email">
                    <UInput v-model="formInscripciones.email" placeholder="example@gmail.com" color="neutral"
                        variant="outline" class="w-full">
                    </UInput>
                </UFormField>

                <UFormField name="nombre" label="Nombre" type="name">
                    <UInput v-model="formInscripciones.nombre" placeholder="Nombre" color="neutral" variant="outline"
                        class="w-full">
                    </UInput>
                </UFormField>

                <UFormField name="apellido" label="Apellido" type="name">
                    <UInput v-model="formInscripciones.apellido" placeholder="Apellido" color="neutral"
                        variant="outline" class="w-full">
                    </UInput>
                </UFormField>

                <UButton type="submit" :loading="guardarFormInscipciones"
                    class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                    Inscribirse al evento
                </UButton>

                <UButton @click="cerrarFormInscripciones" type="button"
                    class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                    Cancelar
                </UButton>

            </UForm>
        </BaseModal>

    </div>
</template>