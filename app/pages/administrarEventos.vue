<script setup lang="ts">

import type { UseFileUploadOptions } from '@nuxt/ui/runtime/composables/useFileUpload.js'
import { ref } from 'vue'
const route = useRoute()

const isActive = (to: String) => route.path === to

//DATOS PARA EL INICIO DE SESION
const navigationItems = [
    { label: 'Administrar Staff', to: '/gestionStaff' },
]

async function cerrarSesion() {
    await $fetch('/api/auth/loginout', {
        method: 'POST'
    })

    await navigateTo('/')
}

// CONST PARA MOSTRAR EVENTOS
import type { Evento } from '~/types/evento'

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')

// CONST PARA INGRESAR EVENTOS

async function agregarEvento() {
    guardando.value = true

    try {
        await $fetch('/api/eventos', {
            method: 'POST',
            body: formEvento
        })

        await refresh()
        limpiarFormulario()

    } catch (error) {
        console.error(error)
    } finally {
        guardando.value = false
    }
}

const guardando = ref(false)
const errorFormulario = ref('')

// datos para los cards
const imagen = ref<File | null>(null)
const formEvento = reactive({
    titulo: '',
    fecha: '',
    hora: '',
    lugar: '',
    valor: undefined,
    inscritos: undefined
})

function limpiarFormulario() {
    formEvento.titulo = ''
    formEvento.fecha = ''
    formEvento.hora = ''
    formEvento.lugar = ''
    // formEvento.imagen = ''
    formEvento.valor = undefined
    formEvento.inscritos = undefined
    errorFormulario.value = ''
}

// PARA LAS IMAGENES DE LOS CARDS


</script>

<template>


    <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">


        <!-- navbar -->
        <header class="bg-gray-950">
            <nav class="sticky top-0 bg-gray-900 mx-auto grid md:grid-cols-2 items-center justify-center">

                <!-- Logo de la pagina -->
                <div class="text-4xl font-extrabold text-purple-600 p-4 mx-4">
                    Smart Events
                </div>

                <div class="flex justify-center items-center md:justify-end p-4 gap-3">

                    <UButton color="primary" variant="soft">
                        <NuxtLink v-for="item in navigationItems" :key="item.to" :to="item.to">
                            {{ item.label }}
                        </NuxtLink>
                    </UButton>

                    <span class="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-lg">
                        Nombre Apellido
                    </span>

                    <UButton
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none"
                        @click="cerrarSesion">
                        Cerrar Sesion
                    </UButton>

                </div>

            </nav>
        </header>

        <!-- PARTE IZQUIERDA (CARDS DE EVENTOS) -->
        <main class="flex-1 container mx-auto px-6 py-10">

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-2">

                    <div class="grid md:grid-cols-2 gap-6">

                        <EventoCard v-for="evento in eventos" :key="evento.id" :evento="evento" />

                    </div>
                </div>

                <!-- PARTE DERECHA (AGREGAR / ELIMINAR EVENTOS) -->
                <UCard class="bg-gray-900 border border-gray-800 h-fit">

                    <h2 class="text-2xl font-bold mb-6 text-purple-600">
                        Agregar evento
                    </h2>

                    <div class="space-y-5">
                        <UInput v-model="formEvento.titulo" placeholder="Título" />
                        <UInput type="date" v-model="formEvento.fecha" placeholder="Fecha" />
                        <UInput type="time" v-model="formEvento.hora" placeholder="Hora" />
                        <UInput v-model="formEvento.lugar" placeholder="Lugar" />
                        <UInput type="number" v-model="formEvento.valor" placeholder="Valor" />
                        <!-- <UInput type="file" @change="seleccionarImagen" /> -->

                        <UButton color="primary" block @click="agregarEvento">

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

    </div>
</template>