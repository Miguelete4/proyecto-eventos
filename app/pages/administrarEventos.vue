<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const route = useRoute()

const isActive = (to: String) => route.path === to

// Validacion con zod, esta instalado
const schemaEventos = z.object({
    nombre: z.string().max(100, 'El nombre debe tener como máximo 100 letras.'),
    apellido: z.string().max(100, 'El apellido debe tener como máximo 100 letras.'),
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    password: z.string().min(8, 'La contraseña debe tener como mínimo 8 caracteres.'),
})

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


//FUNCION PARA ELIMINAR EVENTOS
const idEliminar = ref<number | null>(null)

async function eliminarEvento() {
    if (!idEliminar.value) {
        alert('Ingrese un ID válido')
        return
    }

    try {
        await $fetch('/api/eventos/id', {
            method: 'DELETE',
            body: {
                id: idEliminar.value
            }
        })

        await refresh()
        idEliminar.value = null

    } catch (error) {
        console.error(error)
        alert('No se pudo eliminar el evento')
    }
}

//CONST PARA LISTAR INSCRITOS
const idVerInscritos = ref<number | null>(null)

const eventoSeleccionado = computed(() => {
    return eventos.value?.find(evento => evento.id === idVerInscritos.value)
    // Busca dentro de todos los eventos el que tenga el ID escrito. luego muestra los que estan en ese id
})

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

                <aside class="w-full lg:w-80 shrink-0">
                    <UCard class="bg-gray-900 border border-gray-800">

                        <h2 class="text-2xl font-bold mb-6 text-purple-600">
                            Agregar evento
                        </h2>

                        <UForm class="space-y-5" :schema="schemaEventos" @submit="agregarEvento">

                            <UFormField name="imagen" label="Imagen" type="image">
                                <UFileUpload v-model="imagen" accept="image/*" label="Seleccionar imagen" />
                            </UFormField>

                            <UFormField name="fecha" label="Fecha" type="date">
                                <UInput type="date" v-model="formEvento.fecha" placeholder="Fecha" />
                            </UFormField>

                            <UFormField name="hora" label="Hora" type="hour">
                                <UInput type="time" v-model="formEvento.hora" placeholder="Hora" />
                            </UFormField>

                            <UFormField name="lugar" label="Lugar" type="place">
                                <UInput v-model="formEvento.lugar" placeholder="Lugar" />
                            </UFormField>

                            <UFormField name="valor" label="Valor" type="float">
                                <UInput type="number" v-model="formEvento.valor" placeholder="Valor" />
                            </UFormField>

                            <UButton color="primary" @click="agregarEvento" class="w-full flex justify-center"
                                type="submit">
                                Agregar evento
                            </UButton>

                            <UDivider class="my-3" />

                            <h3 class="text-xl font-semibold">
                                Eliminar evento
                            </h3>

                            <UFormField>
                                <UInput v-model="idEliminar" type="number" placeholder="ID del evento" />
                            </UFormField>

                            <UButton color="error" @click="eliminarEvento" class="w-full flex justify-center"
                                type="button">
                                Eliminar
                            </UButton>

                        </UForm>
                    </UCard>
                </aside>

                <!-- PARTE DERECHA (AGREGAR / ELIMINAR EVENTOS) -->
                <!-- <UCard class="bg-gray-900 border border-gray-800 h-fit">

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

                        <UInput v-model="idEliminar" type="number" placeholder="ID del evento" />

                        <UButton color="error" block @click="eliminarEvento">
                            Eliminar
                        </UButton>
                    </div>

                     listar inscritos 

                <UDivider class="my-3" />

                <h3 class="text-xl font-semibold p-2 translate-y">
                    Ver inscritos
                </h3>

                <UInput v-model="idVerInscritos" type="number" placeholder="ID del evento" />

                <div v-if="eventoSeleccionado" class="space-y-3 mt-4">

                    <h4 class="font-bold text-purple-400">
                        Inscritos en: {{ eventoSeleccionado.titulo }}
                    </h4>

                    <div v-if="eventoSeleccionado.inscrito.length > 0" class="space-y-2">
                        <div v-for="persona in eventoSeleccionado.inscrito" :key="persona.id"
                            class="bg-gray-800 rounded-lg p-3 text-sm">
                            <p><strong>Nombre:</strong> {{ persona.nombre }} {{ persona.apellido }}</p>
                            <p><strong>Email:</strong> {{ persona.email }}</p>
                        </div>
                    </div>

                    <p v-else class="text-gray-400">
                        Este evento no tiene inscritos.
                    </p>

                </div>

                </UCard> -->


            </div>
        </main>

    </div>
</template>