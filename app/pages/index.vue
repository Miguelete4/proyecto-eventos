<script setup lang="ts">

import BaseModal from '~/components/BaseModal.vue';
import type { Evento } from '~/types/evento';
import type { Usuario } from '~/types/usuario';
import { z } from 'zod'

const schemaInicioSesion = z.object({
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    password: z.string().min(8, 'La contraseña debe tener como mínimo 8 caracteres.')
})

const schemaInscripciones = z.object({
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    nombre: z.string().min(3, 'El nombre debe tener un minimo de 3 caracteres.').max(100, 'El nombre debe tener un maximo de 100 caracteres'),
    apellido: z.string().min(3, 'El apellido debe tener un minimo de 3 caracteres.').max(100, 'El apellido debe tener un maximo de 100 caracteres'),
})

const { data: usuario, pending, error, refresh: refreshUsuarios } = await useFetch<Usuario[]>('/api/usuarios')
const { data: eventos, refresh: refreshEventos } = await useFetch<Evento[]>('/api/eventos')

const mostrarFormInicio = ref(false)
const errorFormInicio = ref('')
const guardarFormInicio = ref(false)

const formInicio = reactive({
    email: '',
    password: ''
})

function reiniciarFormInicio() {
    formInicio.email = ''
    formInicio.password = ''
    errorFormInicio.value = ''
}

function abrirFormInicio() {
    reiniciarFormInicio()
    mostrarFormInicio.value = true
}

function cerrarFormInicio() {
    mostrarFormInicio.value = false
    reiniciarFormInicio()
}

const { fetch: fetchSession } = useUserSession()

async function guardarInicio() {
    guardarFormInicio.value = true
    errorFormInicio.value = ''

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: formInicio.email,
                password: formInicio.password
            }
        })

        await fetchSession()
        cerrarFormInicio()
        await navigateTo('/administrarEventos')
    }
    catch (err: any) {
        errorFormInicio.value = getApiErrorMessage(err, 'Error, no se logro iniciar sesion  debido a que no es')
    }
    finally {
        guardarFormInicio.value = false
    }
}

const guardarFormInscipciones = ref(false)
const errorFormInscripciones = ref('')
const mostrarFormInscripciones = ref(false)

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


// VER INSCRIPCIONES USUARIO
// Ver mis inscripciones
const mostrarMisInscripciones = ref(false)
const emailConsulta = ref('')

const eventosDelUsuario = computed(() => {
    return eventos.value?.filter(evento =>
        evento.inscrito?.some(persona => persona.email === emailConsulta.value)
    ) ?? []
})

function abrirMisInscripciones() {
    emailConsulta.value = ''
    mostrarMisInscripciones.value = true
}

function cerrarMisInscripciones() {
    mostrarMisInscripciones.value = false
    emailConsulta.value = ''
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

        <BaseModal v-model:open="mostrarFormInicio" title="Inicio de Sesion" description="Ingrese sus datos para inicar"
            :ui="{ background: 'bg-slate-900' }">
            <UForm class="space-y-5" :state="formInicio" @submit="guardarInicio" :schema="schemaInicioSesion">

                <UFormField name="email" label="Email" type="email">
                    <UInput v-model="formInicio.email" placeholder="ejemplo@gmail.com" color="neutral" variant="outline"
                        class="w-full">
                    </UInput>
                </UFormField>

                <UFormField name="contraseña" label="Contraseña" type="password">
                    <UInput v-model="formInicio.password" placeholder="Contraseña" color="neutral" variant="outline"
                        class="w-full">
                    </UInput>
                </UFormField>

                <div class="flex justify-between items-center">

                    <UButton type="submit" :loading="guardarFormInicio"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors">
                        Ingresar
                    </UButton>

                    <UButton @click="cerrarFormInicio" type="button"
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors">
                        Cancelar
                    </UButton>
                </div>
            </UForm>
        </BaseModal>

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

        <section class="py-12 bg-gray-900">
            <div class="max-w-6xl mx-auto px-4">

                <div class="flex justify-between items-center mb-12">
                    <h3 class="text-2xl font-bold text-purple-600">
                        Eventos disponibles
                    </h3>

                    <UButton type="button" @click="abrirMisInscripciones"
                        class="rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none text-xl">
                        Ver mis Inscripciones
                    </UButton>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    <EventosInicio v-for="evento in eventos ?? []" :key="evento.id" :evento="evento"
                        @inscribirse="abrirFormInscripciones" />

                </div>

            </div>
        </section>

        <BaseModal v-model:open="mostrarFormInscripciones" title="Inscribirse a eventos"
            description="Ingrese sus datos para inscribirse al evento" :ui="{ background: 'bg-slate-900' }">
            <UForm class="space-y-5" @submit="guardarEvento" :schema="schemaInscripciones" :state="formInscripciones">

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

        <!-- VER INSCRIPCIONES -->
        <BaseModal v-model:open="mostrarMisInscripciones" title="Mis inscripciones"
            description="Ingrese su email para ver sus eventos" :ui="{ background: 'bg-slate-900' }">
            <div class="space-y-5">

                <UInput v-model="emailConsulta" placeholder="ejemplo@gmail.com" color="neutral" variant="outline"
                    class="w-full" />

                <div v-if="eventosDelUsuario.length > 0" class="space-y-3">

                    <div v-for="evento in eventosDelUsuario" :key="evento.id" class="bg-gray-800 rounded-lg p-3">
                        <p class="font-bold text-purple-400">
                            {{ evento.titulo }}
                        </p>

                        <p>Fecha: {{ formatFecha(evento.fecha) }}</p>
                        <p>Hora: {{ formatHora(evento.fecha) }}</p>
                        <p>Lugar: {{ evento.lugar }}</p>
                    </div>

                </div>

                <p v-else-if="emailConsulta" class="text-gray-400">
                    No hay inscripciones registradas con este email.
                </p>

                <UButton @click="cerrarMisInscripciones" type="button"
                    class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                    Cerrar
                </UButton>

            </div>
        </BaseModal>

    </div>
</template>