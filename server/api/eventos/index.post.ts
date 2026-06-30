import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'
//importaciones para el funcionamiento
export default defineEventHandler(async (event) => {
    const form = await readMultipartFormData(event)

    //validacion de ingreso de datos
    if (!form) {
        throw createError({
            statusCode: 400,
            message: 'No se recibieron datos'
        })
    }

    //al usar imagenes ya no se puede usar el body
    const titulo = form.find(campo => campo.name === 'titulo')?.data.toString().trim() || ''
    const fecha = form.find(campo => campo.name === 'fecha')?.data.toString().trim() || ''
    const hora = form.find(campo => campo.name === 'hora')?.data.toString().trim() || ''
    const lugar = form.find(campo => campo.name === 'lugar')?.data.toString().trim() || ''
    const valor = form.find(campo => campo.name === 'valor')?.data.toString().trim() || ''

    const imagen = form.find(campo => campo.name === 'imagen')

    let rutaImagen = '/imagenes/default.jpg'

    if (imagen && imagen.filename) {
        const extension = extname(imagen.filename)
        const nombreImagen = `${randomUUID()}${extension}`

        const carpetaUploads = join(process.cwd(), 'public', 'uploads')
        await mkdir(carpetaUploads, { recursive: true })

        const rutaFinal = join(carpetaUploads, nombreImagen)
        await writeFile(rutaFinal, imagen.data)

        rutaImagen = `/uploads/${nombreImagen}`
    }

    const fechaHora = new Date(`${fecha}T${hora}:00`)

    const evento = await prisma.evento.create({
        data: {
            titulo: titulo,
            fecha: fechaHora,
            lugar: lugar,
            valor: Number(valor),
            imagen: rutaImagen
        }
    })

    return {
        ok: true,
        evento
    }
})



//=========El codigo de arriba es medio enredado asi que comento el original para salvarlo en caso de
// en contrar algo mucho mas simple o entendible xd===========

// export default defineEventHandler(async (event) => {
//     const body = await readBody(event)

//     const { titulo, fecha, hora, lugar, valor } = body
//     const tituloNormalizado = typeof titulo === 'string' ? titulo.trim() : ''
//     const fechaNormalizada = typeof fecha === 'string' ? fecha.trim() : ''
//     const horaNormalizada = typeof hora === 'string' ? hora.trim() : ''
//     const lugarNormalizado = typeof lugar === 'string' ? lugar.trim() : ''

//     const fechaHora = new Date(`${fechaNormalizada}T${horaNormalizada}:00`)

//     // insertando en la base de datos
//     const evento = await prisma.evento.create({
//         data: {
//             titulo: tituloNormalizado,
//             fecha: fechaHora,
//             lugar: lugarNormalizado,
//             valor: Number(valor)
//         }
//     })

//     return {
//         ok: true,
//         evento
//     }

// })