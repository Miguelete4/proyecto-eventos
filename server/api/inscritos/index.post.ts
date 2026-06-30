export default eventHandler(async (event) => {
    const body = await readBody(event)

    const { email, nombre, apellido, eventoId } = body

    const emailNormalizado = typeof email === 'string' ? email.trim() : ''
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : ''
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : ''
    const idEventoNormalizado = Number(eventoId)

    const yaInscrito = await prisma.inscrito.findFirst({
        where: {
            email: emailNormalizado,
            eventoId: idEventoNormalizado
        }
    })

    // 2. Si la constante 'yaInscrito' encontró algo (no es null), lanzamos el error
    if (yaInscrito) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Ya te encuentras inscrito en este evento.'
        })
    }

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