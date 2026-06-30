<script setup lang="ts">

// Navegacion de Paginas 

</script>

<template>
    <div class="flex flex-col min-h-screen mt-auto">

        <main>
            <slot />
        </main>

        <footer class="bg-gray-800 text-white py-6 flex justify-center items-center">
            <div class="mx-auto px-4 gap-2">
                <p class="text-white font-extrabold">Universidad Federico Santa María</p>
                <p class="text-white font-extrabold">&copy; 2023 Smart Events. Todos los derechos reservados.</p>
            </div>
        </footer>

    </div>
</template>