export default eventHandler(async (event) => {
    const body = await readBody(event)

    const { email, nombre, apellido, eventoId } = body

    const emailNormalizado = typeof email === 'string' ? email.trim() : ''
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : ''
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : ''
    const idEventoNormalizado = Number(eventoId)

    const inscrito = await prisma.inscrito.create({
        data: {
            email: emailNormalizado,
            nombre: nombreNormalizado,
            apellido: apellidoNormalizado,
            eventoId: Number(eventoId)
        }
    })

    return {
        ok: true,
        inscrito
    }
})