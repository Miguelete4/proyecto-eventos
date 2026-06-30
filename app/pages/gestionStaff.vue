<script setup lang="ts">
const route = useRoute()

const isActive = (to: String) => route.path === to

const navigationItems = [
    { label: 'Administrar Eventos', to: '/administrarEventos' },
]

const adminNombre = ref("Juan")
const adminApellido = ref("Pérez")

const guardarUsuario = ref(false)
const errorUsuario = ref('')

const formUsuario = reactive({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
})

async function agregarUsuario() {
    guardarUsuario.value = true
    errorUsuario.value = ''

    try {
        await $fetch('/api/usuarios', {

        })
    }
    catch (err: any) {

    }
    finally {

    }
}
</script>

<template>

    <div class="min-h-screen bg-gray-950 text-white flex flex-col justify-between">
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

                <div class="flex justify-center items-center md:justify-end p-4 gap-3">

                    <UButton color="primary" variant="soft">
                        <NuxtLink v-for="item in navigationItems" :key="item.to" :to="item.to">
                            {{ item.label }}
                        </NuxtLink>
                    </UButton>

                    <span class="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-lg">
                        {{ adminNombre }} {{ adminApellido }}
                    </span>

                    <UButton
                        class="rounded-2xl bg-purple-600 text-white font-sans hover:bg-purple-700 shadow-md px-5 py-2.5 transition-colors border-none"
                        @click="">
                        Cerrar Sesion
                    </UButton>

                </div>

            </nav>
        </header>

        <!-- <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-xl">
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
        </header>  -->



        <main class="flex-1 container mx-auto px-6 py-10">

            <div class="grid lg:grid-cols-5 gap-10 items-start">

                <!-- ================= STAFF ================= -->

                <div class="lg:col-span-3">

                    <h2 class="text-3xl font-bold mb-3 text-purple-600 ">
                        Staffs actuales del sistema
                    </h2>

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



    </div>

</template>