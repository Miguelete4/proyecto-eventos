<script setup lang="ts">
import type { Usuario } from '~/types/usuario'
import { z } from 'zod'

// Navegacion entre paginas
const route = useRoute()

const navigationItems = [
    { label: 'Administrar Eventos', to: '/administrarEventos' },
]

// Validacion de si es administrador o no en la pagina
definePageMeta({
    middleware: ['admin']
})

// Validacion con zod, esta instalado
const schemaNuevoUsuario = z.object({
    nombre: z.string().min(3, 'El nombre debe tener como minimo 3 caracteres').max(100, 'El nombre debe tener como máximo 100 caracteres.'),
    apellido: z.string().min(3, 'El nombre debe tener como minimo 3 caracteres').max(100, 'El apellido debe tener como máximo 100 letras.'),
    email: z.email({ message: 'Debe ingresar un correo válido.' }),
    password: z.string().min(8, 'La contraseña debe tener como mínimo 8 caracteres.'),
})

//esto es para obtener los datos del usuario (su nombre y apellido)
const { user } = useUserSession()

async function cerrarSesion() {
    await $fetch('/api/auth/loginout', {
        method: 'POST'
    })

    await navigateTo('/')
}

const { data: usuarios, error, refresh, pending } = await useFetch<Usuario[]>('/api/usuarios')

/* AGREGAR USUARIO */
const roles = ['Administrador', 'Usuario']
const errorFormAgregar = ref('')
const guardarUsuario = ref(false)

const formUsuario = reactive({
    nombre: '',
    email: '',
    apellido: '',
    password: '',
    rol: roles[1],
})

function limpiarForm() {
    formUsuario.nombre = '',
        formUsuario.email = '',
        formUsuario.apellido = '',
        formUsuario.password = '',
        formUsuario.rol = roles[1]
}
async function agregarUsuario() {
    guardarUsuario.value = true
    errorFormAgregar.value = ''

    try {
        await $fetch('/api/usuarios/', {
            method: 'POST',
            body: {
                nombre: formUsuario.nombre,
                apellido: formUsuario.apellido,
                email: formUsuario.email,
                password: formUsuario.password,
                rol: formUsuario.rol,
            }
        })
        limpiarForm()
        await refresh()
    }
    catch (err: any) {
        errorFormAgregar.value = getApiErrorMessage(err, 'Error, no se logro guardar al usuario')
    }
    finally {
        guardarUsuario.value = false
    }
}

/* ***** BORRAR USUARIO ***** */
const mostrarConfirmBorrar = ref(false)
const borrandoUsuario = ref(false)
const usuarioBorrar = ref<Usuario | null>(null)

async function borrarUsuario() {
    borrandoUsuario.value = true
    try {
        await $fetch(`/api/usuarios/${usuarioBorrar.value?.email}`, {
            method: 'DELETE'
        })
        cerrarConfirmBorrar()
        await refresh()
    }
    catch (err: any) { }
    finally {
        borrandoUsuario.value = false
    }
}

function confirmarBorrarUsuario(usuario: Usuario) {
    usuarioBorrar.value = usuario
    mostrarConfirmBorrar.value = true
}

function cerrarConfirmBorrar() {
    mostrarConfirmBorrar.value = false
    usuarioBorrar.value = null
}

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

                <div class="flex justify-center items-center md:justify-end gap-3">

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

        <main class="flex-1 container mx-auto px-6 py-10">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                <!-- lado izquierdo: staffs actuales-->
                <div class="lg:col-span-3">

                    <h2 class="text-3xl font-bold mb-6 text-purple-600">
                        Staffs actuales del sistema
                    </h2>

                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                        <div v-for="usuario in usuarios ?? []" :key="usuario.email">
                            <UsuarioCard :usuario="usuario" />

                            <UButton @click="confirmarBorrarUsuario(usuario)" type="button"
                                class="mt-3 rounded-2xl bg-red-500 text-white font-sans hover:bg-red-700 shadow-md px-5 py-2.5 transition-colors border-none w-full flex justify-center">
                                Eliminar
                            </UButton>
                        </div>

                    </div>
                </div>

                <!-- Lado derecho: Creacion de staff -->
                <aside class="lg:col-span-1">
                    <UCard class="bg-gray-900 border border-gray-800 h-fit">

                        <h3 class="text-xl font-bold mb-6 text-purple-600">
                            Administración del Staff
                        </h3>

                        <UForm class="space-y-5" :schema="schemaNuevoUsuario" @submit="agregarUsuario"
                            :state="formUsuario">

                            <UFormField name="nombre" label="Nombre">
                                <UInput v-model="formUsuario.nombre" placeholder="Nombre" color="neutral"
                                    variant="outline" class="w-full" />
                            </UFormField>

                            <UFormField name="apellido" label="Apellido">
                                <UInput v-model="formUsuario.apellido" placeholder="Apellido" color="neutral"
                                    variant="outline" class="w-full" />
                            </UFormField>

                            <UFormField name="email" label="Email">
                                <UInput v-model="formUsuario.email" placeholder="example@gmail.com" color="neutral"
                                    variant="outline" class="w-full" />
                            </UFormField>

                            <UFormField name="contraseña" label="Contraseña">
                                <UInput v-model="formUsuario.password" type="password" placeholder="Contraseña"
                                    color="neutral" variant="outline" class="w-full" />
                            </UFormField>

                            <UFormField name="rol" label="Rol">
                                <USelectMenu v-model="formUsuario.rol" :items="['administrador', 'usuario']"
                                    placeholder="Seleccione el rol" variant="outline" class="w-full" color="neutral" />
                            </UFormField>

                            <UButton type="submit" :loading="guardarUsuario"
                                class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none">
                                Agregar
                            </UButton>

                        </UForm>

                    </UCard>
                </aside>

            </div>

            <!-- MODAL CONFIRMAR BORRADO -->
            <BaseModal v-model:open="mostrarConfirmBorrar" title="Eliminar staff"
                description="¿Seguro que desea eliminar este usuario?"
                :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-red-500' }">
                <div class="space-y-5">

                    <p class="text-gray-300">
                        Se eliminará a:
                        <strong>
                            {{ usuarioBorrar?.nombre }} {{ usuarioBorrar?.apellido }}
                        </strong>
                    </p>

                    <p class="text-gray-400 text-sm">
                        Email: {{ usuarioBorrar?.email }}
                    </p>

                    <div class="flex justify-between gap-3">
                        <UButton color="error" :loading="borrandoUsuario" @click="borrarUsuario">
                            Sí, eliminar
                        </UButton>

                        <UButton type="button" @click="cerrarConfirmBorrar">
                            Cancelar
                        </UButton>
                    </div>

                </div>
            </BaseModal>
        </main>

    </div>

</template>