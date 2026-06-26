<script setup lang="ts">
// Simulamos el nombre del administrador conectado usando tus datos de la BD
const adminNombre = ref("Juan")
const adminApellido = ref("Pérez")

const cerrarSesion = async () => {
    // Al cerrar sesión lo devolvemos a la página pública
    await navigateTo('/')
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white flex">

        <aside
            class="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between p-5 sticky top-0 h-screen">
            <div>
                <div class="mb-8 border-b border-gray-800 pb-5">
                    <h2 class="text-xl font-bold text-primary-500 flex items-center gap-2">
                        ⚡ Panel Admin
                    </h2>
                    <p class="text-xs text-gray-400 mt-2">
                        Admin: <span class="text-gray-200 font-medium">{{ adminNombre }} {{ adminApellido }}</span>
                    </p>
                </div>

                <nav class="space-y-2">
                    <NuxtLink to="/admin/eventos"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition"
                        active-class="bg-primary-600 text-white font-medium shadow-lg shadow-primary-600/20">
                        📅 Gestión de Eventos
                    </NuxtLink>

                    <NuxtLink to="/admin/usuarios"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition"
                        active-class="bg-primary-600 text-white font-medium shadow-lg shadow-primary-600/20">
                        👥 Gestión de Usuarios
                    </NuxtLink>
                </nav>
            </div>

            <div class="border-t border-gray-800 pt-4">
                <UButton variant="soft" block @click="cerrarSesion">
                    Cerrar Sesión
                </UButton>
            </div>
        </aside>

        <main class="flex-1 p-8 overflow-y-auto h-screen">
            <slot />
        </main>

    </div>
</template>