export default defineEventHandler(async () => {
    return await prisma.evento.findMany({
        include: {
            inscrito: true
        }
    })
})