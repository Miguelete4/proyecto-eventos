<script setup lang="ts">

// Navegacion de Paginas 

</script>

<template>
    <div class="flex flex-col min-h-screen justify-center mt-auto">
        <header class="top-0 bg-white shadow-md">

            <nav class="sticky top-0 bg-white ">
                <div class="">

                    <!-- Esto interferia con lo de la pagina de inicio en el navbar, perdon dejarlo comentado xd
                     igual despues modificamos esto ya con lo que mas se repita -->

                    <!-- <a class="text-gray-800 hover:text-blue-500" href="/">Inicio</a> -->
                    <!-- <a class="text-gray-800 hover:text-blue-500" href="/eventos">Eventos</a> -->

                </div>

                <!-- <div class="">Inciar sesion</div> -->
            </nav>

        </header>

        <main>
            <slot />
        </main>

        <footer class="bg-gray-800 text-white py-6">
            <div class="mx-auto px-4">
                <p></p>
            </div>
        </footer>

    </div>
</template>