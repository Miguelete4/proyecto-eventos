<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()

const isActive = (to: String) => route.path === to

// Validacion de si es administrador o no en la pagina
definePageMeta({
    middleware: ['admin']
})

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
//esto es para obtener los datos del usuario (su nombre y apellido)
const { user } = useUserSession()


// CONST PARA MOSTRAR EVENTOS
import type { Evento } from '~/types/evento'

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')

// FUNCION PARA INGRESAR EVENTOS (e imagenes, por eso esta asi de raro)
async function agregarEvento() {
    guardando.value = true

    try {
        const datos = new FormData()

        datos.append('titulo', formEvento.titulo)
        datos.append('fecha', formEvento.fecha)
        datos.append('hora', formEvento.hora)
        datos.append('lugar', formEvento.lugar)
        datos.append('valor', String(formEvento.valor ?? ''))

        if (imagen.value) {
            datos.append('imagen', imagen.value)
        }

        await $fetch('/api/eventos', {
            method: 'POST',
            body: datos
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
    imagen.value = null
    formEvento.valor = undefined
    formEvento.inscritos = undefined
    errorFormulario.value = ''
}

// PARA LAS IMAGENES DE LOS CARDS
const imagen = ref<File | null>(null)
// const imagen = ref<any>(null) //comprobar despues cual es la que mejor sirve

// < pre > {{ imagen }}</pre> //esto es nomas para poner debajo el UFileUpload, para verificar si la imagen es un Object fila
//osea para ver si funcionaba correctamente xd (borralo o pruebalo si quieres miguelete (ayuda tengo sueño))
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
                        {{ user?.nombre }} {{ user?.apellido }}
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
                        <UFileUpload v-model="imagen" accept="image/*" label="Seleccionar imagen" />
                        <UInput v-model="formEvento.titulo" placeholder="Título" />
                        <UInput type="date" v-model="formEvento.fecha" placeholder="Fecha" />
                        <UInput type="time" v-model="formEvento.hora" placeholder="Hora" />
                        <UInput v-model="formEvento.lugar" placeholder="Lugar" />
                        <UInput type="number" v-model="formEvento.valor" placeholder="Valor" />

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