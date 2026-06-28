<script setup lang="ts">
import { ref } from 'vue'

// Forzamos un layout vacío para manejar todo el diseño directamente aquí
definePageMeta({
    layout: false
})

// Datos del administrador (basado en tu modelo Prisma)
const adminNombre = ref("Juan")
const adminApellido = ref("Pérez")

const cerrarSesion = async () => {
    await navigateTo('/')
}

const eventos = async () => {
    await navigateTo('/administracion')
}

</script>

<template>

    <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">

        <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-xl">
            <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

                <h1 class="text-2xl font-black tracking-wider uppercase text-purple-600 ">
                    SMARTS EVENTS
                </h1>

                <div class="flex items-center gap-8">

                    <UButton color="primary" variant="soft" @click="eventos">
                        Administrar Eventos
                    </UButton>

                    <div class="flex items-center gap-3">

                        <span class="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-lg">
                            {{ adminNombre }} {{ adminApellido }}
                        </span>

                        <UButton color="error" variant="soft" @click="cerrarSesion">
                            Cerrar sesion
                        </UButton>

                    </div>

                </div>

            </div>
        </header>



        <main class="flex-1 container mx-auto px-6 py-10">

            <div class="grid lg:grid-cols-5 gap-10 items-start">

                <!-- ================= STAFF ================= -->

                <div class="lg:col-span-3">

                    <h2 class="text-3xl font-bold mb-3 text-purple-600 ">
                        Staffs actuales del sistema
                    </h2>

                    <div class="flex items-center gap-3 mb-8">

                        <span class="text-gray-300">
                            Ordenar por:
                        </span>

                        <USelect class="w-40" placeholder="Seleccionar" :items="[
                            'Nombre (A-Z)',
                            'Nombre (Z-A)',
                            'Rol'
                        ]" />

                    </div>

                    <div class="grid md:grid-cols-2 gap-6">

                        <!-- Staff -->

                        <UCard class="bg-gray-900 border border-gray-800">

                            <h3 class="text-xl font-bold mb-4 text-purple-600 ">
                                Juan Pérez
                            </h3>

                            <div class="space-y-2 text-gray-300 mb-5">

                                <p><strong>Correo:</strong> juan@gmail.com</p>

                                <p><strong>Rol actual:</strong> Admin</p>

                            </div>

                            <div class="flex gap-3">

                                <UButton color="error" block>
                                    Eliminar
                                </UButton>

                            </div>

                        </UCard>

                        <!-- Otro usuario -->

                        <UCard class="bg-gray-900 border border-gray-800 ">

                            <h3 class="text-xl font-bold mb-4 text-purple-600 ">
                                María Soto
                            </h3>

                            <div class="space-y-2 text-gray-300 mb-5">

                                <p><strong>Correo:</strong> maria@gmail.com</p>

                                <p><strong>Rol actual:</strong> Usuario</p>

                            </div>


                            <div class="flex gap-3">

                                <UButton color="error" block>
                                    Eliminar
                                </UButton>

                            </div>

                        </UCard>

                        <!-- Duplica las cards cuando tengas más usuarios -->

                    </div>

                </div>

                <!-- ================= PANEL ================= -->

                <UCard class="lg:col-span-2 bg-gray-900 border border-gray-800 h-fit">

                    <h2 class="text-2xl font-bold mb-6 text-purple-600 ">
                        Agregar Staff
                    </h2>

                    <div class="space-y-5">

                        <UInput placeholder="Nombre" />

                        <UInput placeholder="Apellido" />

                        <UInput placeholder="Correo electrónico" />

                        <UInput type="password" placeholder="Contraseña" />

                        <USelect placeholder="Rol" :items="[
                            'Admin',
                            'Usuario'
                        ]" />

                        <UButton color="primary" block>
                            Agregar Staff
                        </UButton>

                    </div>

                </UCard>

            </div>
        </main>


        <footer
            class="bg-gray-900 border-t border-gray-800 text-center py-4 text-xs tracking-wider text-gray-500 uppercase">
            © 2026 Smart Events - Panel Administrativo
        </footer>

    </div>

</template>