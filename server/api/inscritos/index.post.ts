export default eventHandler(async (event) => {

    const body = await readBody(event)

    const { id, email, nombre, apellido, eventoId } = body
    
    const inscrito = await prisma.inscrito.create({
        data: {
            id: Number(id),
            email: email.trim(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            eventoId: eventoId
        }
    })

    return {
        ok: true,
        inscrito
    }
})