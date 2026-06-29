export default eventHandler(async (event) => {
    const body = await readBody(event)

    const { titulo, fecha, hora, lugar, imagen, valor, inscrito } = body
    
    const fechaNormalizada = typeof fecha === 'string' ? fecha.trim() : ''
    const horaNormalizada = typeof fecha === 'string' ? hora.trim() : ''

    const fechaHora = new Date(`${fechaNormalizada}T${horaNormalizada}:00`)

    const evento = await prisma.evento.create({
        data: {
            titulo: titulo.trim(),
            fecha: fechaHora,
            lugar: lugar.trim(),
            imagen: imagen.trim(),
            valor: Number(valor),
            inscrito: inscrito
        }
    })

    return {
        ok: true,
        evento
    }
})