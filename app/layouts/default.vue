<script setup lang="ts">

// Navegacion de Paginas 

</script>

<template>
    <div class="flex flex-col min-h-screen mt-auto">
        <header class="top-0 bg-white shadow-md">

            <nav class="sticky top-0 bg-white mx-auto flex items-center justify-between py-4">

                <!-- Logo de la pagina -->
                <div class="text-4xl font-extrabold text-blue-600 p-4 mx-4">Smart Events</div>

                <!-- Links de las paaginas, cuando terminemos el diseño de todo vemos como hacer el
                 pasar las paginas que usabamos en clase, el NavegationLink:[]... -->
                <div class="flex items-center justify-center gap-5 mx-4">

                    <a class="text-gray-800 hover:text-blue-600 transition-colors" href="/">Inicio</a>
                    <a class="text-gray-800 hover:text-blue-600 transition-colors" href="/eventos">Eventos</a>

                    <!-- Ponemos un boton yo creo -->
                    <UButton
                        class="border rounded-2xl bg-blue-600 text-white font-sans hover:bg-blue-700 shadow-md px-5 py-2.5 transition-colors"
                        @click.prevent="">
                        Inciar sesion
                    </UButton>

                </div>
            </nav>

        </header>

        <main>
            <slot />
        </main>

        <!-- Tiene una parte de IA con copilot, en especial la de copy xd -->
        <footer class="bg-gray-800 text-white py-6 flex justify-center items-center">
            <div class="mx-auto px-4 gap-2">
                <p class="text-white font-extrabold">Universidad Federico Santa María</p>
                <p class="text-white font-extrabold">&copy; 2023 Smart Events. Todos los derechos reservados.</p>
            </div>
        </footer>

    </div>
</template>