export default eventHandler(async (event) => {
    const body = await readBody(event)

    const { email, nombre, apellido, eventoId } = body

    const inscrito = await prisma.inscrito.create({
        data: {
            email: email.trim(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            eventoId: Number(eventoId)
        }
    })

    return {
        ok: true,
        inscrito
    }
})