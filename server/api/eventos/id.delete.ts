export default defineEventHandler(async (event) => {
    const { id } = await readBody(event)

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID inválido'
        })
    }

    await prisma.inscrito.deleteMany({
        where: {
            eventoId: id
        }
    })

    const evento = await prisma.evento.delete({
        where: {
            id: id
        }
    })

    return {
        ok: true,
        evento
    }
})