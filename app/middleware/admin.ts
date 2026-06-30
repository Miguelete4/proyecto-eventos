export default defineNuxtRouteMiddleware(() => {
    const { user } = useUserSession();
    
    if (user.value?.rol !== "administrador") {
        throw createError({ statusCode: 403, message: 'acceso denegado' })
    }
});
