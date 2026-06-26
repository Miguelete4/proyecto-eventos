<script setup lang="ts">

// Navegacion de Paginas 

</script>

<template>
    <div class="flex flex-col min-h-screen justify-center mt-auto">
        <header class="top-0 bg-white shadow-md">

            <nav class="sticky top-0 bg-white flex items-center justify-between px-6 py-4 shadow-md">

                <!-- Logo de la pagina -->
                <div class="text-4xl rounded-4xl bg-blue-600 font-extrabold text-white p-4 mx-4"></div>

                <!-- Links de las paaginas, cuando terminemos el diseño de todo vemos como hacer el
                 pasar las paginas que usabamos en clase, el NavegationLink:[]... -->
                <div class="">

                    <!-- Esto interferia con lo de la pagina de inicio en el navbar, perdon dejarlo comentado xd
                    igual despues modificamos esto ya con lo que mas se repita -->

                    <a class="text-gray-800 hover:text-blue-500" href="/">Inicio</a> -->
                    <a class="text-gray-800 hover:text-blue-500" href="/eventos">Eventos</a> -->

                </div>

                <!-- Ponemos un boton yo creo -->
                <div class="border bg-gray-600 text-black font-sans hover:bg-blue-600 ">
                    Inciar sesion</div>
            </nav>

        </header>

        <main>
            <slot />
        </main>

        <!-- Tiene una parte de IA con copilot, en especial la de copy xd -->
        <footer class="bg-gray-800 text-white py-6 flex justify-center items-center">
            <div class="mx-auto px-4">
                <p class="text-white font-extrabold">Contactos</p>
                <p class="text-white font-extrabold">Universidad Federico Santa María</p>
                <p class="text-white font-extrabold">&copy; 2023 Smart Events. Todos los derechos reservados.</p>
            </div>
        </footer>

    </div>
</template>