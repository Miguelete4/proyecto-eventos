<script setup lang="ts">

import { ref } from 'vue'

//CONST PARA EL NAVBAR
const cerrarSesion = async () => {
    await navigateTo('/')
}

const staff = async () => {
    await navigateTo('/gestionStaff')
}

// CONST PARA MOSTRAR EVENTOS
import type { Evento } from '~/types/evento'

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')
// console.log(eventos.value)


// CONST PARA INGRESAR EVENTOS
import type { Inscrito } from '~/types/inscrito'
// const { data: inscritos, pending: pendingInscritos } = await useFetch<Inscrito[]>('/api/inscritos')

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

const formEvento = reactive({
    titulo: '',
    fecha: '',
    hora: '',
    lugar: '',
    // imagen: '',
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
// const imagen = ref<File | null>(null)

// function seleccionarImagen(event: Event) {
//     const input = event.target as HTMLInputElement

//     if (input.files && input.files.length > 0) {
//         imagen.value = input.files[0]!
//     }
// }

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
                            <!-- {{ adminNombre }} {{ adminApellido }} -->
                        </span>

                        <UButton color="error" variant="soft" @click="cerrarSesion">
                            Cerrar sesión
                        </UButton>

                    </div>

                </div>

            </div>
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