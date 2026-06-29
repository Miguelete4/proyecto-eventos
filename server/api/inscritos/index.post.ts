export default eventHandler(async (event) => {
    const body = await readBody(event)

    const { email, nombre, apellido, eventoId } = body


    const emailNormalizado = typeof email === 'string' ? email.trim() : ''
    const nombreNormalizado = typeof email === 'string' ? nombre.trim() : ''
    const apellidoNormalizado = typeof email === 'string' ? apellido.trim() : ''

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