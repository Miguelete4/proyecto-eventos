<template>
    <div class="flex flex-col min-h-screen mt-auto">

        <main>
            <slot />
        </main>

        <footer class="bg-gray-800 text-white py-6">
            <div class="mx-auto px-4 flex flex-col items-center text-center gap-2">
                <p class="font-extrabold">Universidad Federico Santa María</p>
                <p class="font-extrabold">&copy; 2026 Smart Events. Todos los derechos reservados.</p>
            </div>
        </footer>

    </div>
</template>