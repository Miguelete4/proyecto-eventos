export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { titulo, fecha, hora, lugar, valor } = body
    const tituloNormalizado = typeof titulo === 'string' ? titulo.trim() : ''
    const fechaNormalizada = typeof fecha === 'string' ? fecha.trim() : ''
    const horaNormalizada = typeof hora === 'string' ? hora.trim() : ''
    const lugarNormalizado = typeof lugar === 'string' ? lugar.trim() : ''

    const fechaHora = new Date(`${fechaNormalizada}T${horaNormalizada}:00`)

    // insertando en la base de datos
    const evento = await prisma.evento.create({
        data: {
            titulo: tituloNormalizado,
            fecha: fechaHora,
            lugar: lugarNormalizado,
            valor: Number(valor)
        }
    })

    return {
        ok: true,
        evento
    }

})