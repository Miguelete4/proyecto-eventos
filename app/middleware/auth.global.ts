export default defineNuxtRouteMiddleware((to) => {
    const { loggedIn } = useUserSession()

    const rutaspublicas = '/'

    if (!loggedIn.value && !rutaspublicas.includes(to.path)) {
        return navigateTo("/")
    }
    
})