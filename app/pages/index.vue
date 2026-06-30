<script setup lang="ts">

import BaseModal from '~/components/BaseModal.vue';
import type { Evento } from '~/types/evento';
import type { Usuario } from '~/types/usuario';
import { z } from 'zod'

// Validacion con zod, esta instalado
const schemaInicioSesion = z.object({
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    password: z.string().min(8, 'La contraseña debe tener como mínimo 8 caracteres.'),
})

// Validacion formInscripciones
const schemaInscripciones = z.object({
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    nombre: z.string().min(8, 'El nombre debe tener un minimo de 3 caracteres.').max(100, 'El nombre debe tener un maximo de 100 caracteres'),
    apellido: z.string().min(8, 'El apellido debe tener un minimo de 3 caracteres.').max(100, 'El apellido debe tener un maximo de 100 caracteres'),
})

const { data: usuario, pending, error, refresh: refreshUsuarios } = await useFetch<Usuario[]>('/api/usuarios')
const { data: eventos, refresh: refreshEventos } = await useFetch<Evento[]>('/api/eventos')

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
        cerrarFormInicio()
        await navigateTo('/administrarEventos')
    }
    catch (err: any) {
        // Use la funcion del profe a ver si funciona 
        errorFormInicio.value = getApiErrorMessage(err, 'Error, no se logro iniciar sesion  debido a que no es')
    }
    finally {
        guardarFormInicio.value = false
    }
}

// Formluario de inscripciones
const guardarFormInscipciones = ref(false)
const errorFormInscripciones = ref('')
const mostrarFormInscripciones = ref(false)

// =========================CAMBIAR ESTO =======================
const formInscripciones = reactive({
    email: '',
    nombre: '',
    apellido: '',
    eventoId: 0
})

function resetFormInscripciones() {
    formInscripciones.email = ''
    formInscripciones.nombre = ''
    formInscripciones.apellido = ''
    formInscripciones.eventoId = 0
    errorFormInscripciones.value = ''
}

function abrirFormInscripciones(evento: Evento) {

    resetFormInscripciones()

    formInscripciones.eventoId = evento.id

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
                apellido: formInscripciones.apellido,
                eventoId: formInscripciones.eventoId
            }
        })
        await refreshEventos()
        cerrarFormInscripciones()
    } catch {
        errorFormInscripciones.value = 'Error, no se logró inscribir correctamente'
    } finally {
        guardarFormInscipciones.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white">

        <!-- navbar -->
        <header class="bg-gray-950">
            <nav class="sticky top-0 bg-gray-900 mx-auto grid md:grid-cols-2 items-center justify-center">

                <!-- Logo de la pagina -->
                <div class="text-4xl font-extrabold text-purple-600 p-4 mx-4">
                    Smart Events
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
            <UForm class="space-y-5" :state="form" @submit="login" :schema="schemaInicioSesion">
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
                <div class="flex justify-between items-center">

                    <UButton type="submit" :loading="guardarFormInicio"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                        Ingresar
                    </UButton>

                    <UButton @click="cerrarFormInicio" type="button"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                        Cancelar
                    </UButton>
                </div>
            </UForm>
        </BaseModal>

        <!-- Parte de la informacion de la pagina -->
        <div
            class="flex flex-col items-center justify-center min-h-100 p-8 text-center bg-linear-to-br from-purple-600 to-gray-500">

            <div class="flex flex-col max-w-2xl gap-8">

                <h2 class="text-6xl font-extrabold text-black">
                    El lugar donde están los mejores eventos
                </h2>

                <p class="text-black text-2xl">
                    Así de simple: elige lo que quieres hacer hoy, inscríbete con un par de clics y vive la experiencia.
                </p>

            </div>

        </div>


        <!-- eventos disponibles -->
        <section class="py-12 bg-gray-900">
            <div class="max-w-6xl mx-auto px-4">

                <div class="flex justify-between items-center mb-12">
                    <h3 class="text-2xl font-bold text-purple-600">
                        Eventos disponibles
                    </h3>

                    <button type="button"
                        class="rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none text-xl">
                        Ver mis Inscripciones
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    <EventosInicio v-for="evento in eventos ?? []" :key="evento.id" :evento="evento"
                        @inscribirse="abrirFormInscripciones" />

                </div>

            </div>
        </section>

        <!-- Modal de inscripciones -->
        <BaseModal v-model:open="mostrarFormInscripciones" title="Inicio de Sesion"
            description="Ingrese sus datos para inicar"
            :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-purple-500' }">
            <UForm class="space-y-5" @submit="guardarEvento" :schema="schemaInscripciones">

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

                <div class="flex justify-between items-center">
                    <UButton type="submit" :loading="guardarFormInscipciones"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                        Inscribirse al evento
                    </UButton>

                    <UButton @click.prevent="cerrarFormInscripciones" type="button"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                        Cancelar
                    </UButton>
                </div>
            </UForm>
        </BaseModal>

    </div>
</template>